import React, { useState } from 'react'
import { FiMenu, FiX } from "react-icons/fi";
import { IoMdPaper } from "react-icons/io"
import './ComponentCSS/Header.css'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Store/userSilce';
import { checkout } from "../Store/examSilce";
import SearchBar from './SearchBar';
import './ComponentCSS/SearchBar.css';

function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => ({ ...state }))
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const Logout = () => {
        dispatch(logout([]))
        dispatch(checkout([]))
        navigate('/')
    }
    try {
        if (user.userStore.user.token) {
            if (user.userStore.user.role === 'admin') {
                return (
                    <nav className="header">    
                        <div className="logo-container">
                            <Link to="/">Pre-CCNA</Link>
                        </div>
                        <div className="search-container">
                            <SearchBar/>
                        </div>
                        <div className="header-con">
                            <ul className={click ? "menu active" : " menu"} >
                                <li className= "menu-link"  onClick={closeMobileMenu}>
                                    <Link to="/admin/home">AdminMenu</Link>
                                </li>
                                <li className="menu-link" onClick={closeMobileMenu}>
                                    <Link to="/store">Exam List</Link>
                                </li>
                                <li className="menu-link" onClick={closeMobileMenu}>
                                    <Link to="/info">What is CCNA?</Link>
                                </li>

                                <li className="menu-link" onClick={Logout} >
                                    <Link to="/">Logout</Link>
                                </li>

                            </ul>
                        </div>
                        <div className="mobile-menu" onClick={handleClick}>
                            {click ? (

                                <FiX />
                            ) : (
                                <FiMenu />
                            )}

                        </div>
                    </nav>
                )
            }
            return (
                <nav className="header">
                    <div className="logo-container">
                        <Link to="/">Pre-CCNA</Link>
                    </div>
                    <div className="search-container">
                            <SearchBar/>
                        </div>
                    <div className="header-con">
                        <ul className={click ? "menu active" : " menu"}>
                            <li className="menu-link" onClick={closeMobileMenu}>
                                <Link to="/store">Exam List</Link>
                            </li>
                            <li className="menu-link" onClick={closeMobileMenu}>
                                <Link to="/info">What is CCNA?</Link>
                            </li>

                            <li className="menu-link" onClick={closeMobileMenu}>
                                <Link to="/user/profile">Profile</Link> 
                            </li>

                            <li className="menu-link" onClick={Logout} >
                                <Link to="/">Logout</Link>
                            </li>

                        </ul>
                    </div>
                    <div className="mobile-menu" onClick={handleClick}>
                        {click ? (

                            <FiX />
                        ) : (
                            <FiMenu />
                        )}

                    </div>
                </nav>
            )
        } else {
            return (
                <nav className="header">
                    <div className="logo-container">
                        <Link to="/">Pre-CCNA</Link>
                    </div>
                    <div className="search-container">
                            <SearchBar/>
                        </div>
                    <div className="header-con">
                        <ul className={click ? "menu active" : " menu"}>
                            <li className="menu-link" onClick={closeMobileMenu}>
                                <Link to="/store">Exam List</Link>
                            </li>
                            <li className="menu-link" onClick={closeMobileMenu}>
                                <Link to="/info">What is CCNA?</Link>
                            </li>

                            <li className="menu-link" onClick={closeMobileMenu}>
                                <Link to="/register">Register</Link>
                            </li>
                            <li className="menu-link" onClick={closeMobileMenu}>
                                <Link to="/login">Login</Link>
                            </li>


                        </ul>
                    </div>
                    <div className="mobile-menu" onClick={handleClick}>
                        {click ? (

                            <FiX />
                        ) : (
                            <FiMenu />
                        )}
                    </div>
                </nav>

            )
        }
    } catch (error) {
        return (
            <nav className="header">
                <div className="logo-container">
                    <Link to="/">Pre-CCNA<IoMdPaper /></Link>
                </div>
                <div className="header-con">
                    <ul className={click ? "menu active" : " menu"}>
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <Link to="/store">Exam List</Link>
                        </li>
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <Link to="/info">What is CCNA?</Link>
                        </li>

                        <li className="menu-link" onClick={closeMobileMenu}>
                            <Link to="/register">Register</Link>
                        </li>
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <Link to="/login">Login</Link>
                        </li>

                    </ul>
                </div>
                <div className="mobile-menu" onClick={handleClick}>
                    {click ? (
                        <FiX />
                    ) : (
                        <FiMenu />
                    )}
                </div>
            </nav>

        )
    }

}


export default Header