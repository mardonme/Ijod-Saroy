import React from "react";
import "./Loader.css";

const Loader = () => {
  return <div className="loader-box" style={{backgroundImage: 'url("/images/ijod-bg.jpg")'}}>
    <div className="loader"></div>
  </div>;
};

export default Loader;
