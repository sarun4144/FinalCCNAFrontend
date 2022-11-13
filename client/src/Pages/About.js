import React from "react";
import { Link} from "react-router-dom";
import './About.css';

function About() {
  return (
    <div className="about-container">
       <div className="about-container-header">พวกเราเป็นใคร?</div>
       <center><Link to="/" > กลับสู่หน้าหลัก</Link></center>
    </div>
 
  )
}

export default About;