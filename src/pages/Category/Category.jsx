import React from "react";
import "./Category.css";
import { useInfoContext } from "../../context/InfoContext";
import { addProd } from "../../api/addRequests";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";

const Category = () => {
  const { categorys, serverUrl, currentUser, toggle, exit } = useInfoContext();

  const addcategory = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData(e.target);
      const res = await addProd(data, "category");
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

  return (
    <div className="container">
      <form className="add-form" action="" onSubmit={addcategory}>
        <h4>{currentUser?.role === 101 && "Add"} Oficce</h4>
        {currentUser?.role === 101 && (
          <>
            <div>
              <input
                type="text"
                name="title"
                placeholder="Category title"
                required
              />
              <label htmlFor="categoryImg">
                <i className="fa-solid fa-image"></i>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="categoryImg"
                  name="image"
                  required
                />
              </label>
              <button>add</button>
            </div>
          </>
        )}
      </form>
      <div className="cars-box">
        {categorys?.length > 0 ? (
          categorys.map((category) => {
            return (
              <Link key={category._id} to={`/brand/${category._id}`}>
                <div className="category">
                  <img
                    src={`${serverUrl}/${category.categoryImg}`}
                    alt="car_photo"
                  />
                  <h2>{category.title}</h2>
                </div>
              </Link>
            );
          })
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Category;
