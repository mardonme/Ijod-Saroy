// importlar o‘zgarmagan
import React, { useEffect, useState } from 'react'
import { useInfoContext } from '../../context/InfoContext'
import Card from '../../components/Card/Card'
import { useParams } from 'react-router-dom'
import { addRes } from "../../api/addRequests";
import { toast } from "react-toastify";
import { Modal } from 'antd'
import InputValue from '../../components/InputValue/InputValue'
import { updateRes } from '../../api/updateRequests';
import PhoneInput from '../../components/PhoneInput/PhoneInput';

const Brands = () => {
    const { cars, categorys, currentUser, exit, setLoad } = useInfoContext();
    const { id } = useParams();
    const result = cars.filter(car => car?.categoryId === id);
    
    const [open, setOpen] = useState();
    const toggleModal = () => setOpen(!open);

    const [preview, setPreview] = useState(null);
    const [update, setUpdate] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedId, setSelectedId] = useState("");

    useEffect(() => {
        if (update) {
            setPreview(update?.profilePicture?.url);
            const selectedCategory = categorys.find(category => category._id === update.categoryId);
            if (selectedCategory) {
                setSelectedTitle(selectedCategory.title);
            }
        }
    }, [update]);

    const handleChange = (event) => {
        const title = event.target.value;
        setSelectedTitle(title);
        const selectedCategory = categorys.find(category => category.title === title);
        setSelectedId(selectedCategory ? selectedCategory._id : "");
    };

    const handleFile = (file) => {
        const fr = new FileReader();
        const format = file?.type?.split("/")[1]?.toLowerCase();
        const allowedFormats = ["png", "jpeg", "jpg", "heic", "heif"];
        const maxSizeInBytes = 2 * 1024 * 1024;

        if (file && allowedFormats.includes(format)) {
            if (file.size > maxSizeInBytes) {
                toast("Rasm hajmi 2 MB dan kichik bo'lishi kerak", { type: "error" });
                return;
            }

            setImageFile(file); // 🟢 Faylni statega saqlash
            fr.readAsDataURL(file);
            fr.addEventListener("load", () => {
                const url = fr.result;
                localStorage.setItem("temp", JSON.stringify(url));
                setPreview(url);
            });
        } else {
            toast("Rasm formatidagi xato. Faqat png, jpg, jpeg, heic, heif", { type: "error" });
        }
    };

    const handleFileSelect = (event) => {
        if (event?.target?.files[0]) {
            handleFile(event.target.files[0]);
        }
    };

    const handleDragOver = (event) => {
        if (!event) return;
        event.preventDefault();
    };

    const handleDrop = (event) => {
        if (!event) return;
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const addUser = async (e) => {
        e.preventDefault();
        setLoad(true);
        const data = new FormData(e.target);
        data.append("author", currentUser._id);
        try {
            const res = await addRes(data, "user");
            e.target.reset();
            setPreview(null);
            setImageFile(null);
            toggleModal();
            toast.success(res?.data.message);
        } catch (err) {
            if (err?.response?.data.message === "jwt expired") exit();
            toast.error(err?.response?.data.message);
        } finally {
            setLoad(false);
        }
    };

    const updateUser = async (e) => {
        e.preventDefault();
        setLoad(true);
        const data = new FormData(e.target);
        if (imageFile) {
            data.append("image", imageFile); // 🟢 Update qilishda faylni qo‘shish
        }
        try {
            const res = await updateRes(update._id, data, "user");
            e.target.reset();
            setPreview(null);
            setImageFile(null);
            toggleModal();
            toast.success(res?.data.message);
        } catch (err) {
            if (err?.response?.data.message === "jwt expired") exit();
            toast.error(err?.response?.data.message);
        } finally {
            setLoad(false);
        }
    };

    return (
        <div className="container">
            <div className='cars-box'>
                {result.length > 0 ? result.map(res => (
                    <Card key={res._id} car={res} showUpdate={toggleModal} setUpdate={setUpdate} />
                )) : <h2>User not found</h2>}
            </div>

            {open && (
                <Modal open={open} footer={false} onCancel={toggleModal} centered>
                    <form className="add-form" onSubmit={update ? updateUser : addUser}>
                        <b>Yangi xodim (ishchi) qo'shish</b>
                        <div>
                            <div className="file-upload">
                                <label htmlFor="file-input" className="upload-box"
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    style={preview ? { border: '1px solid green' } : { borderStyle: 'dashed' }}>
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="preview-image" />
                                    ) : (
                                        <div className="upload-content">
                                            <p className="image-info">Yuklash uchun ustiga bosing <br /> <i className="fa-solid fa-download"></i></p>
                                            <p>Rasmni tanlang yoki ushbu bo‘lim ustiga olib keling.</p>
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
                            <InputValue defaultValue={update?.firstname || ""} type="text" name="firstname" icon='fa-user' placeholder="Ism" required={!update} />
                            <InputValue defaultValue={update?.lastname || ""} type="text" name="lastname" icon='fa-user' placeholder="Familiya" required={!update} />
                            <PhoneInput defaultValue={update?.phoneNumber || ""} required={!update}/>
                            <InputValue defaultValue={update?.email || ""} type="email" name="email" icon='fa-at' placeholder="Email" required={!update} />
                            <InputValue type="password" name="password" icon='fa-lock' placeholder="Parol" required={!update} />
                            <div className="title-office">
                                <input
                                    list="browsers"
                                    name="categoryTitle"
                                    placeholder="Ofisni tanlang"
                                    value={selectedTitle}
                                    onChange={handleChange}
                                    required
                                />
                                <datalist id="browsers">
                                    {categorys.filter(res => res.author === currentUser._id).map(category => (
                                        <option key={category._id} value={category.title} />
                                    ))}
                                </datalist>
                                <input type="text" hidden name="categoryId" value={update ? update.categoryId : selectedId} />
                            </div>
                            <button
                                disabled={!preview && !update}
                                style={
                                    preview || update
                                        ? { borderColor: 'green', color: 'white', cursor: 'pointer', backgroundColor: 'green' }
                                        : { borderColor: 'rgba(255, 0, 0, 0.300)', color: 'rgba(255, 0, 0, 0.300)', cursor: 'no-drop' }
                                }>
                                {update ? "Xodimni o'zgartirish" : "Xodimni qo'shish"}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            {(currentUser?.role === 101 || currentUser?.role === 102) && (
                <button className="add-category" onClick={toggleModal}><i className="fa-solid fa-user-plus"></i></button>
            )}
        </div>
    );
};

export default Brands;
