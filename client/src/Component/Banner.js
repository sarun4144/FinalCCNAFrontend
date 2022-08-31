import React from 'react'
import "./Banner.css"
import { Link} from "react-router-dom"
let bannerData = {
    title: "Welcome to Pre-CCNA exame Website",
    desc: "สวัสดีครับ ยินดีต้อนรับสู่เว็นไซต์รวบรวมและทดลองทำข้องสอบ CCNA กรุณา Login เพื่อทำข้อสอบครับ"
}

function Banner() {
    return (
        <div className="row" > 
     <div className="col-md-1"></div>
    <div className='col-md-10'>
    
        <div className="banner-bg">
            <div className="container">
                <div className="banner-con">
                    <div className="banner-text">
                        <h1>{bannerData.title}</h1>
                        <p>
                            {bannerData.desc}
                        </p>
                        <Link to="/login" className="banner-btn">Login</Link>
                    </div>
                </div>
            </div>
        </div>
            </div>
        <div className="col-md-1"></div>
        </div>  
    )
}

export default Banner