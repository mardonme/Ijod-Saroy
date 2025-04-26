import React, { useState } from "react";
import "./Category.css";
import { useInfoContext } from "../../context/InfoContext";
import { addRes } from "../../api/addRequests";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import { Modal } from "antd";
import { deleteUser } from "../../api/deleteRequests";

const Category = () => {
  const { categorys, setLoad, currentUser, toggle, exit } = useInfoContext();
  const [open, setOpen] = useState()
  const toggleModal = () => setOpen(!open)
  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState(null);
  const [clicked, setClicked] = useState(false);

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


  const addcategory = async (e) => {
    e.preventDefault();
    setClicked(true)
    setLoad(true);
    try {
      const data = new FormData(e.target);
      data.append('author', currentUser._id)
      const res = await addRes(data, "category");
      toggleModal()
      setLoad(false);
      setClicked(false)
      e.target.reset();
      toast.dismiss();
      toast.success(res?.data.message);
    } catch (err) {
      if (err?.response?.data.message === "jwt expired") {
        exit();
      }
      setLoad(false);
      setClicked(false)
      toast.dismiss();
      toast.error(err?.response?.data.message);
    }
  };

  const handleDelete = async (id) => {
      if (window.confirm("Are you sure you want to delete this Worker?")) {
        setLoad(true);
        try {
          const res = await deleteUser(id, "category");
          setLoad(false);
          toast.dismiss();
          toast.success(res?.data.message);
        } catch (err) {
          if (err?.response?.data.message === "jwt expired") {
            exit();
          }
          setLoad(false)
          toast.dismiss();
          toast.error(err?.response?.data.message);
        }
      }
    };

  return (
    <div className="container">
      <div className="cars-box">
        {categorys?.length > 0 ? (
          categorys.map(office => {
            return (
              <div className="category-item" key={office._id} >
              {(office.author === currentUser?._id || currentUser?.role === 102)&& <i className='fa-solid fa-trash delBtn' onClick={() => handleDelete(office?._id)}></i>}
              <Link className="link-item" to={`/brand/${office._id}`}></Link>
                <div className="category">
                  <img
                    src={`${office.image.url}`}
                    alt="car_photo"
                  />
                  <h2>{office.title}</h2>
                </div>
              </div>
            );
          })
        ) : (
          <Loader />
        )}
      </div>
      {open && <Modal open={open} footer={false} onCancel={toggleModal}>
          <form className="add-form" action="" onSubmit={addcategory}>
          <h4>Yangi Ofis qo'shish</h4>
          {(currentUser?.role === 101 || currentUser?.role === 102) && (
            <>
               <div className="project-info">
                  <div className="file-upload">
                    <label htmlFor="file-input" className="upload-box" onDragOver={handleDragOver} onDrop={handleDrop} style={preview ? {border: '1px solid green'} : {borderStyle: 'dashed'}}>
                      {preview ? (
                        <img src={preview} alt="Preview" className="preview-image"/>
                      ) : (
                        <div className="upload-content">
                          <p className="image-info">Yuklash uchun ustiga bosing <br /> <i className="fa-solid fa-download"></i></p>
                          <p>
                            Ofisni yoki ish posterini (suratini) tanlang.
                            Yoki posterni (suratni) ushbu bo'lim ustiga olib keling.
                          </p>
                        </div>
                      )}
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      name="image"
                      required
                      onChange={handleFileSelect}
                      style={{ display: "none" }}
                    />
                  </div>
                  <div className="title-office">
                      <input onChange={(e) => setTitle(title === "" || title === " " ? e.target.value.trim() :  e.target.value)} defaultValue={title} style={preview && title !== "" ? {borderColor: 'green'} : {}} id="office-title" type="text" name="title"required />
                      <label>Ofisning (Ish joyining) nomi</label>
                  </div>
                  <button disabled={!preview || title === "" || title.trim() === "" || clicked} style={preview && title !== "" ? {borderColor: 'green', color: 'white', cursor: 'pointer', backgroundColor: 'green'} : {borderColor: 'rgba(255, 0, 0, 0.300)', color: 'rgba(255, 0, 0, 0.300)', cursor: 'no-drop'}}>Ofisni qo'shish</button>
                </div>
            </>
          )}
        </form>
      </Modal>}
      {(currentUser?.role === 101 || currentUser?.role === 102 ) && <button title="Add Office" className="add-category" onClick={toggleModal}><i className="fa-solid fa-calendar-plus"></i></button>}
    </div>
  );
};

export default Category;
