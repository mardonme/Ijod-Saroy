import React, { useState } from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import { useInfoContext } from "../../context/InfoContext";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from "react-toastify";
import { logIn } from "../../api/authRequests";
import { Modal } from "antd";
const Header = () => {
  const { currentUser, exit, setCurrentUser} = useInfoContext();
  const [disButton, setdisButton] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleAuth = () => setOpen(!open)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setdisButton(true)
    const data = new FormData(e.target)
    try {
      toast.loading("Iltimos kuting...")
      const res = await logIn(data);
      setCurrentUser(res?.data.user);
      toast.dismiss()
      toast.success(res?.data.message)
      localStorage.setItem("profile", JSON.stringify(res?.data.user))
      localStorage.setItem("access_token", res?.data.token)
      setdisButton(false)
      window.location.replace('/')
  } catch (error) {
      toast.dismiss()
      toast.error(error?.response?.data.message)
      setdisButton(false)
  }
  }
  const [value, setValue] = useState()
  return (
    <header>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink
              to="/users"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Ishchilar
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Adminlar
            </NavLink>
          </li>
        </ul>
      </nav>
      <NavLink to="/" className="logo">
        <div className="logo">
          <img className="logo-img" src="/images/logo.png" alt="logo" />
          <img
            className="logo-text"
            src="/images/logo-text.png"
            alt="logo-text"
          />
        </div>
      </NavLink>
      <div className="log-out">
        {!currentUser ? (
          <div onClick={toggleAuth} className="nav-link login">
              Kirish
          </div>
        ) : (
          <div className="home-exit">
            <Link to={`/profile/${currentUser._id}`} className="exit-login">
              <i className="fa-solid fa-user"></i>
            </Link>
          </div>
        )}
      </div>
      {open && <Modal open={open} footer={false} onCancel={toggleAuth} centered>
      <form action="" onSubmit={handleSubmit} className="auth-form">
            <h3>Kabinetga kirish</h3>
            <div>
              <input type="email" name="email" className="info-input" placeholder="Xodimning email manzili" required />
            </div>
            <div>
              <input type="password" name="password" className="info-input" placeholder="Xodimning paroli" required />
            </div>
            <div>
              <button disabled={disButton} className="info-btn button">Kirish</button>
            </div>
          </form>  
      </Modal>}
    </header>
  );
};

export default Header;
