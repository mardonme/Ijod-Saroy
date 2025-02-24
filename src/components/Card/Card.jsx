import React from "react";
import "./Card.css";
import { useInfoContext } from "../../context/InfoContext";
import { toast } from "react-toastify";
import { deleteUser } from "../../api/deleteRequests";

const Card = ({ car }) => {
  const { serverUrl, exit, toggle } = useInfoContext();
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        const res = await deleteUser(id, "car");
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

  console.log(car);
  
  return (
    <div>
      <div className="card">
        <img src={`${serverUrl}/${car.carImg}`} alt="card_photo" />
        <div className="card-body">
          <h4 style={{ marginTop: "10px" }}> Ismi: {car.name}</h4>
          <h4 style={{ marginTop: "10px" }}> Familiyasi: {car.surname}</h4>
          <h4 style={{ marginTop: "10px" }}> Telefon: {car.phone}</h4>
        </div>
        <div style={{display:"flex", flexDirection: "row-reverse"}}>
          <i class='bx bx-trash bx-sm' style={{ marginRight: "10px", cursor: "pointer", color: "#A2001D" }} onClick={() => handleDelete(car._id)}></i>      </div>
        </div>
    </div>
  );
};

export default Card;
