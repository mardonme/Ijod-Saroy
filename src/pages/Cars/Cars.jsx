import React, { useState } from "react";
import "./Cars.css";
import Card from "../../components/Card/Card";
import { useInfoContext } from "../../context/InfoContext";
import { addRes } from "../../api/addRequests";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import { Modal } from "antd";

const Cars = () => {
  const { cars, categorys, currentUser, exit, toggle } = useInfoContext();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [open, setOpen] = useState()
  const [clicked, setClicked] = useState(false);
  const toggleModal = () => setOpen(!open)
  const [preview, setPreview] = useState(null);
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

  const addCars = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    data.append("author", currentUser._id);
    try {
      const res = await addRes(data, "worker");
      toggle();
      e.target.reset();
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

  console.log(cars);

  return (
    <div className="container">
        {open && <Modal open={open} footer={false} onCancel={toggleModal} centered>
          <form className="add-form" onSubmit={addCars} action="">
            <b>Yangi xodim (ishchi) qo'shish</b>
            {currentUser && (
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
                          required
                          onChange={handleFileSelect}
                          style={{ display: "none" }}
                        />
                </div>
                <div className="title-office">
                  <input onChange={(e) => setName(name === "" || name === " " ? e.target.value.trim() :  e.target.value)} value={name} style={name !== "" ? {borderColor: 'green'} : {}} id="office-name" type="text" name="name" required />
                  <label><i className="fa-solid fa-user"></i> Xodimning (Ishchining) ismi</label>
                </div>
                <div className="title-office">
                  <input onChange={(e) => setSurname(surname === "" || surname === " " ? e.target.value.trim() :  e.target.value)} value={surname} style={surname !== "" ? {borderColor: 'green'} : {}} id="office-name" type="text" name="surname" required />
                  <label><i className="fa-solid fa-user"></i> Xodimning (Ishchining) familiyasi</label>
                </div>
                <div className="title-office">
                  <input onChange={(e) => setPhone(phone === "" || phone === " " ? e.target.value.trim() :  e.target.value)} value={phone} style={phone !== "" ? {borderColor: 'green'} : {}} id="office-name" type="number" name="phone" required />
                  <label><i className="fa-solid fa-phone"></i> Xodimning (Ishchining) telefon raqami</label>
                </div>
                <div className="title-office">
                  <select name="categoryId" onChange={(e) => setCategoryId(e.target.value)} value={categoryId} style={categoryId !== "" ? {borderColor: 'green'} : {}} required>
                    <option defaultValue="" defaultChecked selected>
                      Ofisni (Ish joyini) tanlang
                    </option>
                    {categorys.map((category) => {
                      return (
                        <option key={category._id} value={category._id}>
                          {category.title}
                        </option>
                      );
                    })}
                  </select>
                  <label><i className="fa-solid fa-home"></i></label>
                </div>
                <button disabled={!preview || name === "" || name.trim() === "" ||surname === "" ||surname.trim() === "" || categoryId === "" || categoryId.trim() === "" || phone === "" || phone.trim() === "" || clicked} style={preview && name !== "" && name !== " " && surname !== "" && surname !== " " && phone !== "" && phone !== " " && categoryId !== "" && categoryId !== " " ? {borderColor: 'green', color: 'white', cursor: 'pointer', backgroundColor: 'green'} : {borderColor: 'rgba(255, 0, 0, 0.300)', color: 'rgba(255, 0, 0, 0.300)', cursor: 'no-drop'}}>Xodimni (Ishchini) qo'shish</button>
              </div>
            )}
          </form>
        </Modal>}
        <button name="Add Office" className="add-category" onClick={toggleModal}><i className="fa-solid fa-user-plus"></i></button>
      <div className="cars-box">
        {cars?.length > 0 ? (
          cars.map((car) => {
            if (car) {
              return <Card key={car._id} car={car} />;
            }
            return <h2>User not found</h2>;
          })
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Cars;
