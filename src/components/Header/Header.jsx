import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'
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
      <NavLink to='/' class="logo">
        <div className="logo">
          <img className='logo-img' src="/images/logo.png" alt="logo" />
          <img className='logo-text' src="/images/logo-text.png" alt="logo-text" />
        </div>
      </NavLink>
      <div className='log-out'>
        {!currentUser ? <NavLink to="/auth" className='nav-link login'>Login</NavLink> : <div className="home-exit">
          <div onClick={exit} className="exit-login"><i className="fa-solid fa-right-to-bracket"></i></div>
        </div>}
      </div>
    </header>

  )
}

export default Header