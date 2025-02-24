import React from "react";
import "./Users.css";
import Card from "../../components/Card/Card";
import { useInfoContext } from "../../context/InfoContext";
import Loader from "../../components/Loader/Loader";

const Users = () => {
  const { cars} = useInfoContext();
  return (
    <div className="container">
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

export default Users;
