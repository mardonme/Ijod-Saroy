import React, { useState } from 'react'
import './Header.css'
import { Link, NavLink } from 'react-router-dom'
import navLogo from "./img/nav-logo.svg"
import Location from '../Location/Location'
import { useInfoContext } from '../../context/InfoContext'

const Header = () => {
  const {currentUser, exit} = useInfoContext()
  const [dropdown, setDropDown] = useState(false)
  return (
    <header>
          <nav className='navbar'>
            <ul className="nav-list">
                <li className='nav-item'>
                </li>
                <li className='nav-item'>
                    <NavLink to='/'>
                      <h2>Yoshlar ijod saroyi</h2>
                    </NavLink>
                </li>
                <li className='nav-item'>
                  {!currentUser ? <NavLink to="/auth" className='nav-link login'>Login</NavLink> : <div className="home-exit">
                        <div onClick={exit} className="exit-login"><i className="fa-solid fa-right-to-bracket"></i></div>
                    </div>}
                </li>
            </ul>
            <ul className="res-list">
                <li className='res-logo'>
                    <NavLink to='/'>
                      <h2>Yoshlar ijod saroyi</h2>
                    </NavLink>
                </li>
                <li className="res-item">
                  {!currentUser ? <NavLink to="/auth" className='nav-link login'>Login</NavLink> : <div className="home-exit">
                        <div onClick={exit} className="exit-login"><i className="fa-solid fa-right-to-bracket"></i></div>
                    </div>}
                </li>
            </ul>
          </nav>
    </header>

  )
}

export default Header