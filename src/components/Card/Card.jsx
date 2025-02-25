import React, { useState } from "react";
import "./Card.css";
import { useInfoContext } from "../../context/InfoContext";
import { toast } from "react-toastify";
import { deleteUser } from "../../api/deleteRequests";
import { Link } from "react-router-dom";

const Card = ({ car, showUpdate, setUpdate}) => {
  const { currentUser, exit, toggle } = useInfoContext();
  const [open, setOpen] = useState(false)

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Worker?")) {
      try {
        const res = await deleteUser(id, "user");
        toast.dismiss();
        toast.success(res?.data.message);
        toggle();
        setOpen(false)
      } catch (err) {
        if (err?.response?.data.message === "jwt expired") {
          exit();
        }
        toast.dismiss();
        toast.error(err?.response?.data.message);
      }
    }
  };

  return (
      <div className="card">
        <Link className="link-item" to={`/profile/${car._id}`}></Link>
        <img src={`${car?.profilePicture?.url}`} alt="card_photo" />
        <div className="card-body">
          <h4><i className="fa-solid fa-user"></i> {car?.firstname} {car?.lastname}</h4>
          <h6><i className="fa-solid fa-at"></i> {car?.email}</h6>
          <h4> <i className="fa-solid fa-phone"></i> {car?.phoneNumber}</h4>
          <div className="options-btn delBtn" onClick={() => setOpen(!open)}> <i className="fa-solid fa-ellipsis-vertical"></i> </div>
          {(car.authorId === currentUser?._id && open) || ( currentUser?.role === 102 && open) && 
            <ul className="options">
              <li onClick={() => handleDelete(car?._id)}><i className='fa-solid fa-trash'></i> O'chirish</li>
              <li onClick={() => {setUpdate(car); setOpen(false); showUpdate()}}><i className='fa-solid fa-pen'></i> O'zgartirish</li>
            </ul>
          }
        </div>
        </div>
  );
};

export default Card;
