import React from 'react'
import './Header.css'
import { Link, NavLink } from 'react-router-dom'
import { useInfoContext } from '../../context/InfoContext'

const Header = () => {
  const { currentUser, exit } = useInfoContext()
  return (
    <header>
      <nav className='navbar'>
        <ul className="nav-list">
          <li className='nav-item'>
            <NavLink to='/users'>
              Ishchi
            </NavLink>
            <NavLink to='/admin'>
              Admin
            </NavLink>
          </li>
        </ul>
      </nav>
      <NavLink to='/' className="logo">
        <div className="logo">
          <img className='logo-img' src="/images/logo.png" alt="logo" />
          <img className='logo-text' src="/images/logo-text.png" alt="logo-text" />
        </div>
      </NavLink>
      <div className='log-out'>
        {!currentUser ? <NavLink to="/auth" className='nav-link login'>Login</NavLink> : <div className="home-exit">
          <Link to={`/profile/${currentUser._id}`} className="exit-login"><i className="fa-solid fa-user"></i></Link>
        </div>}
      </div>
    </header>

  )
}

export default Header