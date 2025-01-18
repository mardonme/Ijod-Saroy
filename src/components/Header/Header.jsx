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
                  {/* <NavLink to='/' className='nav-NavlinkNavLink'>Home</NavLink>
                  <NavLink to='/cars' className='nav-NavlinkNavLink'>Cars</NavLink>
                  <NavLink to='/category' className='nav-NavlinkNavLink'>Category</NavLink> */}
                  {/* <Location/> */}
                </li>
                <li className='nav-item'>
                    <NavLink to='/'>
                      {/* <img src={navLogo} alt="Logo" /> */}
                      <h2>Yoshlar ijod saroyi</h2>
                    </NavLink>
                </li>
                <li className='nav-item'>
                  {/* {currentUser && <NavLink className='nav-NavlinkNavLink'>My Cars</NavLink>}
                  <NavLink className='nav-NavlinkNavLink'>Menu</NavLink>
                  <NavLink className='nav-NavlinkNavLink'>Infomation</NavLink> */}
                  {!currentUser ? <NavLink to="/auth" className='nav-link login'>Login</NavLink> : <div className="home-exit">
                        <Link to="/"><div className="exit-home"><i className="fa-sharp fa-solid fa-house"></i></div></Link>
                        <div onClick={exit} className="exit-login"><i className="fa-solid fa-right-to-bracket"></i></div>
                    </div>}
                </li>
            </ul>
            <ul className="res-list">
                <li className='res-logo'>
                    <NavLink to='/'>
                      <img src={navLogo} alt="Logo" />
                    </NavLink>
                </li>
                <li className="res-item">
                  {!currentUser ? <NavLink to="/auth" className='nav-link login'>Login</NavLink> : <div className="home-exit">
                        <div onClick={() => setDropDown(!dropdown)} className="exit-home"><i className="fa-solid fa-bars-staggered"></i></div>
                        <div onClick={exit} className="exit-login"><i className="fa-solid fa-right-to-bracket"></i></div>
                    </div>}
                </li>
            </ul>
              {dropdown && 
                <div className="dropdown">
                  <NavLink to='/'  className='nav-NavlinkNavLink'>Home</NavLink>
                  <NavLink to='/cars' className='nav-NavlinkNavLink'>Cars</NavLink>
                  <NavLink to='/category' className='nav-NavlinkNavLink'>Category</NavLink>
                  <NavLink to='/addcar' className='nav-NavlinkNavLink'>Add Car</NavLink>
                  <NavLink className='nav-NavlinkNavLink'>Menu 3</NavLink>
                </div>
              }
          </nav>
    </header>

  )
}

export default Header