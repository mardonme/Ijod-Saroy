import React from "react";
import "./Card.css";
import { useInfoContext } from "../../context/InfoContext";
import { toast } from "react-toastify";
import { deleteUser } from "../../api/deleteRequests";
import { Link } from "react-router-dom";

const Card = ({ car }) => {
  const { serverUrl, exit, toggle } = useInfoContext();
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Worker?")) {
      try {
        const res = await deleteUser(id, "worker");
        toast.dismiss();
        toast.success(res?.data.message);
        toggle();
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
      <Link to={`/profile/${car._id}`} className="card">
        <img src={`${car?.photo?.url}`} alt="card_photo" />
        <div className="card-body">
          <h4><i className="fa-solid fa-user"></i> {car?.name} {car?.surname}</h4>
          <h4> <i class="fa-solid fa-phone"></i> {car?.phone}</h4>
          <i className='bx bx-trash bx-sm' onClick={() => handleDelete(car?._id)}></i>
        </div>
        </Link>
  );
};

export default Card;
