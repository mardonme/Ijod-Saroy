import React, { useState } from "react";
import "./Card.css";
import { useInfoContext } from "../../context/InfoContext";
import { toast } from "react-toastify";
import { deleteUser } from "../../api/deleteRequests";
import { Link, useLocation } from "react-router-dom";

const Card = ({ car, showUpdate, setUpdate}) => {
  const { currentUser, exit, setLoad } = useInfoContext();
  const [open, setOpen] = useState(false)
  const path = useLocation().pathname
  console.log(car);
  
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Worker?")) {
      setLoad(true);
      try {
        const res = await deleteUser(id, "user");
        toast.dismiss();
        toast.success(res?.data.message);
        setLoad(false);
        setOpen(false)
      } catch (err) {
        if (err?.response?.data.message === "jwt expired") {
          exit();
        }
        setLoad(false);
        toast.dismiss();
        toast.error(err?.response?.data.message);
      }
    }
  };
  const canEdit = (currentUser?.role === 101 && currentUser && car?.author === currentUser?._id) || (currentUser?.role === 102 && currentUser)
  console.log(canEdit);
  
  return (
      <div className="card">
        <Link className="link-item" to={`/profile/${car._id}`}></Link>
        <img src={car?.profilePicture ? `${car?.profilePicture?.url}` : '/images/default.jpg'} alt="card_photo" />
        <div className="card-body">
          <h4 className="name"><i className="fa-solid fa-user"></i> {car?.firstname} {car?.lastname}</h4>
          <h6><i className="fa-solid fa-at"></i> {car?.email}</h6>
          <h4> <i className="fa-solid fa-phone"></i> {car?.phoneNumber?.length > 0 && car?.phoneNumber !== "+998 (__) ___-__-__" ? car?.phoneNumber : '--- -- --- -- --'}</h4>
          {((canEdit && path.slice(1) !== "users") || currentUser?.role === 102) && (
              <div className="options-btn delBtn" onClick={() => setOpen(!open)}>
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>
            )}
          {(canEdit && open) && (
            <ul className="options">
              <li onClick={() => handleDelete(car?._id)}><i className='fa-solid fa-trash'></i> O'chirish</li>
              <li onClick={() => { setUpdate(car); setOpen(false); showUpdate(); }}>
                <i className='fa-solid fa-pen'></i> O'zgartirish
              </li>
            </ul>
          )}
        </div>
        </div>
  );
};

export default Card;
