import React from "react";
import "./Cars.css";
import Card from "../../components/Card/Card";
import { useInfoContext } from "../../context/InfoContext";
import { addProd } from "../../api/addRequests";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";

const Cars = () => {
  const { cars, categorys, currentUser, exit, toggle } = useInfoContext();

  const addCars = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    data.append("author", currentUser._id);
    try {
      const res = await addProd(data, "car");
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
      <form className="add-form" onSubmit={addCars} action="">
        <b>{currentUser && "Add"} Users</b>
        {currentUser && (
          <div>
            <input type="text" name="name" placeholder="Name" required />
            <input type="text" name="surname" placeholder="Surname" required />
            <input type="number" name="phone" placeholder="Phone" required />
            <select name="categoryId" required>
              <option defaultValue="" selected disabled>
                Offices
              </option>
              {categorys.map((category) => {
                return (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                );
              })}
            </select>
            <label htmlFor="userImg">
              <i className="fa-solid fa-image"></i>
              <input
                style={{ display: "none" }}
                type="file"
                id="userImg"
                name="image"
                required
              />
            </label>
            <button>Add User</button>
          </div>
        )}
      </form>
      <div className="cars-box">
        {cars?.length > 0 ? (
          cars.map((car) => {
            if (car) {
              return <Card key={car._id} car={car} />;
            }
            return <h2>Cars not found</h2>;
          })
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Cars;
