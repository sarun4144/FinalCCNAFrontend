import React, { useState } from "react";
import { Link } from "react-router-dom";
import './info.css';
import { BiNetworkChart } from "react-icons/bi";
import { InfoData } from './InfoData';

function Info() {
  const [catDisplay, setCatDisplay] = useState('Network Fundamentals');

  const FilterSelector = InfoData.filter((filterCat) => {
    return filterCat.category === catDisplay
  })

  return (
    <div className="info-container">
      <div className="info-container-header">อะไรคือ CCNA?</div>
      <div className="info-text"> &nbsp; &nbsp; ใบรับรอง CCNA ของ Cisco ที่เป็นบริษัทผลิตและจัดจำหน่ายอุปกรณ์ฮาร์ดแวร์ ซอฟต์แวร์ ที่
        เกี่ยวข้องกับระบบเครือข่ายชั้นนำของนานาชาติ
        โดยใบรับรอง CCNA หรือ Cisco Certified Network Associate คือใบรับรองระดับเบื้องต้น
        เกี่ยวการสายอาชีพ IT ที่ถูกออกโดย Cisco ซึ่งใบรับรอง CCNA จะเป็นใบรับรองความรู้ความสามารถที่
        จำเป็นต่องานที่เกี่ยวข้องกับระบบเครือข่ายซึ่งจำเป็นสำหรับตำแหน่งงานในด้าน IT ซึ่งการเข้าทำข้อสอบ
        เพื่อรับใบรับรอง CCNA นั้นเป็นภาษาอังกฤษและการสอบในแต่ละครั้งจะมีค่าใช้จ่ายที่สูงอีกทั้งยังมีความ
        ยากในระดับหนึ่ง ผู้เข้าสอบจึงควรเตรียมความพร้อมก่อนสอบให้เรียบร้อย
      </div>
      <div className="info-text">&nbsp; &nbsp; โดยที่ในข้อสอบสำหรับใบรับรอง CCNA จะประกอบไปด้วยเนื้อหาต่างๆเกี่ยวกับระบบ Network
        ซึ่งสามารถจำแนกออกเป็นประเภทต่างๆ และประกอบไปด้วยเนื้อหาดังนี้
      </div>
      <button className="info-cat-selector" onClick={() => setCatDisplay('Network Fundamentals')}>Network Fundamentals</button>
      <button className="info-cat-selector" onClick={() => setCatDisplay('Network Access')}>Network Access</button>
      <button className="info-cat-selector" onClick={() => setCatDisplay('IP Connectivity')}>IP Connectivity</button>
      <button className="info-cat-selector" onClick={() => setCatDisplay('IP Services')}>IP Services</button>
      <button className="info-cat-selector" onClick={() => setCatDisplay('Security Fundamentals')}>Security Fundamentals</button>
      <button className="info-cat-selector" onClick={() => setCatDisplay('Automation and Programmability')}>Automation and Programmability</button>
      <div className="info-cat-display">
        <h5>เนื้อหาของ {catDisplay} ประกอบไปด้วย :</h5>
        {FilterSelector.map((item) =>
          <li>
            {item.display}
          </li>)}
      </div>
      <center><Link to="/" > กลับสู่หน้าหลัก</Link></center>
    </div>

  )
}

export default Info;