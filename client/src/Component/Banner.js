import React from 'react'
import "./Banner.css"
import { Link} from "react-router-dom"
let bannerData = {
    title: "Welcome to Pre-CCNA exame Website",
    desc: "สวัสดีครับ ยินดีต้อนรับสู่เว็นไซต์รวบรวมและทดลองทำข้องสอบ CCNA"
}

function Banner() {
    return (
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
    )
}

export default Banner