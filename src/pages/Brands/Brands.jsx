import React, { useEffect, useState } from 'react'
import { useInfoContext } from '../../context/InfoContext'
import Card from '../../components/Card/Card'
import { useParams } from 'react-router-dom'
import { addRes } from "../../api/addRequests";
import { toast } from "react-toastify";
import { Modal } from 'antd'
import InputValue from '../../components/InputValue/InputValue'
import { updateRes } from '../../api/updateRequests';

const Brands = () => {
    const {cars, categorys, currentUser, exit, toggle } = useInfoContext();
    const {id} = useParams()
    const result = cars.filter(car => car?.categoryId === id)
    const [open, setOpen] = useState()
    const [clicked, setClicked] = useState(false);
    const toggleModal = () => setOpen(!open)
    const [preview, setPreview] = useState(null);
    const [update, setUpdate] = useState(null);

    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedId, setSelectedId] = useState("");

    useEffect(()=>{
        if(update){
            setPreview(update.profilePicture.url)
            const selectedCategory = categorys.find(category => category._id === update.categoryId);
            if (selectedCategory) {
                setSelectedTitle(selectedCategory.title)
            }
        }
    },[update])

    const handleChange = (event) => {
        const title = event.target.value;
        setSelectedTitle(title);

        // Title ga mos ID ni topish
        const selectedCategory = categorys.find(category => category.title === title);
        if (selectedCategory) {
            setSelectedId(selectedCategory._id);
        } else {
            setSelectedId(""); // Mos kelmasa ID bo'sh bo'ladi
        }
    };


    const handleFileSelect = (event) => {
        if (!event) return;

        const fr = new FileReader();    

        const file = event.target.files[0];
        const format = file?.type?.split("/")[1];
        const maxSizeInMB = 2;
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

        if (
        (file && format === "png") ||
        (file && format === "jpeg") ||
        (file && format === "jpg")
        ) {
        if (file.size > maxSizeInBytes) {
            toast("Rasm hajmi 2 MB dan kichik bo'lishi kerak", "error");
            return;
        }
        
        fr.readAsDataURL(file);
        console.log(fr);
        fr.addEventListener("load", () => {
            const url = fr.result;
            localStorage.setItem("temp", JSON.stringify(url));
            setPreview(url);
        
        }); 
        } else {
        toast("Rasm formatidagi xato", "error");
        }
    };

    const handleDragOver = (event) => {
    if (!event) return;
    event.preventDefault();
    };

    const handleDrop = (event) => {
    if (!event) return;
    event.preventDefault();

    const fr = new FileReader();    

    const file = event.dataTransfer.files[0];
    const format = file?.type?.split("/")[1];
    const maxSizeInMB = 2;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (
        (file && format === "png") ||
        (file && format === "jpeg") ||
        (file && format === "jpg")
    ) {
        if (file.size > maxSizeInBytes) {
        toast("Rasm hajmi 2 MB dan kichik bo'lishi kerak", "error");
        return;
        }
        fr.readAsDataURL(file);
        console.log(fr);
        fr.addEventListener("load", () => {
        const url = fr.result;
        localStorage.setItem("temp", JSON.stringify(url));
        setPreview(url);
        
        });
    } else {
        toast("rasm formatidagi xato", "error");
    }
    };

    const addUser = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    data.append("author", currentUser._id);
    try {
        const res = await addRes(data, "user");
        e.target.reset();
        toggle();
        toggleModal()
        toast.dismiss();
        toast.success(res?.data.message);
    } catch (err) {
        if (err?.response?.data.message === "jwt expired") {
        exit();
        }
        toast.dismiss();
        toast.error(err?.response?.data.message);
    }
    };

    const updateUser = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    try {
        const res = await updateRes(update._id, data, "user");
        e.target.reset();
        toggle();
        toggleModal()
        toast.dismiss();
        toast.success(res?.data.message);
    } catch (err) {
        console.log(err);
        
        if (err?.response?.data.message === "jwt expired") {
        exit();
        }
        toast.dismiss();
        toast.error(err?.response?.data.message);
    }
    };


  return (
    <div className="container">
        <div className='cars-box'>
            {result.length > 0 ? result.map(res => {
                return (
                    <Card key={res._id} car={res} showUpdate={toggleModal} setUpdate={setUpdate}/>
                )
            }): <h2>User not found</h2>}
        </div>
        {open && <Modal open={open} footer={false} onCancel={toggleModal} centered>
          <form className="add-form" onSubmit={update ? updateUser : addUser} action="">
            <b>Yangi xodim (ishchi) qo'shish</b>
            <div>
              <div className="file-upload">
                      <label htmlFor="file-input" className="upload-box" onDragOver={handleDragOver} onDrop={handleDrop} style={preview ? {border: '1px solid green'} : {borderStyle: 'dashed'}}>
                        {preview ? (
                          <img src={preview} alt="Preview" className="preview-image"/>
                        ) : (
                          <div className="upload-content">
                            <p className="image-info">Yuklash uchun ustiga bosing <br /> <i className="fa-solid fa-download"></i></p>
                            <p>
                              Xodimni yoki ishchini posterini (suratini) tanlang.
                              Yoki posterni (suratni) ushbu bo'lim ustiga olib keling.
                            </p>
                          </div>
                        )}
                      </label>
                      <input
                        id="file-input"
                        type="file"
                        name="image"
                        required={!update}
                        onChange={handleFileSelect}
                        style={{ display: "none" }}
                      />
              </div>
                <InputValue defaultValue={update?.firstname || null} type="text" name="firstname" icon='fa-user' placeholder="Xodimning (Ishchining) ismi" required={!update}/>
                <InputValue defaultValue={update?.lastname || null} type="text" name="lastname" icon='fa-user' placeholder="Xodimning (Ishchining) familiyasi" required={!update}/>
                <InputValue defaultValue={update?.phoneNumber || null} type="tel" name="phoneNumber" icon='fa-phone' placeholder="Xodimning (Ishchining) telefon raqami" required={!update}/>
                <InputValue defaultValue={update?.email || null} type="email" name="email" icon='fa-at' placeholder="Xodimning (Ishchining) emaili (elektron pochta manzili)" required={!update}/>
                <InputValue type="password" name="password" icon='fa-lock' placeholder="Xodimning (Ishchining) paroli" required={!update}/>
                <div className="title-office">
                  <input 
                      list="browsers" 
                      name="categoryTitle" 
                      placeholder="Ofisni (Ish joyini) tanlang" 
                      value={selectedTitle} 
                      onChange={handleChange}
                      required
                  />
                  <datalist id="browsers">
                      {categorys.filter(res => res.author === currentUser._id).map((category) => {
                          return <option key={category._id} value={category.title} />
                      })}
                  </datalist>
                  <input type="text" hidden name="categoryId" value={update ? update.categoryId : selectedId} />
              </div>
              <button disabled={!preview || clicked} style={preview ? {borderColor: 'green', color: 'white', cursor: 'pointer', backgroundColor: 'green'} : {borderColor: 'rgba(255, 0, 0, 0.300)', color: 'rgba(255, 0, 0, 0.300)', cursor: 'no-drop'}}>{update ? "Xodimni (Ishchini) o'zgartirish" : "Xodimni (Ishchini) qo'shish"}</button>
            </div>
          </form>
        </Modal>}
        <button name="Add Office" className="add-category" onClick={toggleModal}><i className="fa-solid fa-user-plus"></i></button>
    </div>
  )
}

export default Brands