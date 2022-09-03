import React, { useState } from 'react'
import { FiMenu, FiX } from "react-icons/fi";
import {IoMdPaper} from "react-icons/io"
import './Header.css'
import { Link} from "react-router-dom"

 function Header() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    console.log(click);
    const closeMobileMenu = () => setClick(false);
  return (
    //แถวกับหลัก
    
    <div className="header"> 
      <div className="container">
        <div className="header-con">
            <div className="logo-container">
            <Link to="/">Pre-CCNA<IoMdPaper /></Link>
            </div>
            <ul className={click ? "menu active" : "menu"}>
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <Link to="/store">คลังข้อสอบ</Link>
                        </li>
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <Link to="/info">อะไรคือ CCNA?</Link>
                        </li>
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <Link to="/about">About Us</Link>
                        </li>
                        <li className="menu-link"  onClick={closeMobileMenu}>
                            <Link to="/register">Register</Link>
                        </li>
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                <div className="mobile-menu" onClick={handleClick}>
                    {click ? (
                        
                        <FiX />
                    ) : (
                        <FiMenu />
                    )}

            </div>
        </div>
      </div>
    </div> 
 
  )
}


export default Header