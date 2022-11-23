import React from 'react'
import "./ComponentCSS/Banner.css"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Store/userSilce';
import { checkout } from "../Store/examSilce";
import bannerBG from './bannerbg.jpg';

let bannerData = {
    title: "Welcome to Pre-CCNA Exam Website",
    desc0: "Please Register or Login to access Exam List",
    desc1: "Please Enjoy practicing with our website"
}


function Banner() {
    const dispatch = useDispatch();
    const user = useSelector((state) => ({ ...state }))
    const Token = user.userStore.user.token
    const navigate = useNavigate();
    const Logout = () => {
        dispatch(logout([]))
        dispatch(checkout([]))
        navigate('/')
    }
    return (
        <div className="banner-bg">
            <div className='banner-img'>


                <div className="container-banner">

                    <div className="banner-con">
                        <div className="banner-text">
                            <h1>{bannerData.title}</h1>
                            {Token
                                ? <p>
                                    {bannerData.desc1}
                                </p> : <p>
                                    {bannerData.desc0}
                                </p>
                            }



                            {Token
                                ? <><Link to="/store" className="banner-btn">Exam List</Link><br />
                                    <Link to="/" className="banner-btn-out" onClick={Logout}>Logout</Link></>
                                : <><Link to="/login" className="banner-btn">Login</Link>
                                    &nbsp;<Link to="/register" className="banner-btn-reg">Register</Link></>
                            }

                        </div>
                    </div>
                </div>

            </div>
        </div>



    )
}

export default Banner