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
      <div className="info-container-header">What is CCNA?</div>
      <div className="info-text"> &nbsp; &nbsp; The CCNA—which stands for Cisco Certified Network Associate—is an entry-level information technology (IT)
        certification issued by networking hardware company Cisco. The CCNA is designed to validate your knowledge on fundamental networking concepts often requested in networking roles in IT positions.
      </div>
      <div className="info-text">&nbsp; &nbsp; To earn your CCNA certification, you must pass the 200-301 CCNA exam.
        This 120-minute exam tests your knowledge of :
      </div>
      <button className="info-cat-selector" onClick={() => setCatDisplay('Network Fundamentals')}>Network Fundamentals</button>
      <button className="info-cat-selector" onClick={() => setCatDisplay('Network Access')}>Network Access</button>
      <button className="info-cat-selector" onClick={() => setCatDisplay('IP Connectivity')}>IP Connectivity</button>
      <button className="info-cat-selector" onClick={() => setCatDisplay('IP Services')}>IP Services</button>
      <button className="info-cat-selector" onClick={() => setCatDisplay('Security Fundamentals')}>Security Fundamentals</button>
      <button className="info-cat-selector" onClick={() => setCatDisplay('Automation and Programmability')}>Automation and Programmability</button>
      <div className="info-cat-display">
        <h5>This topics of {catDisplay} likely to be included in the CCNA exam : </h5>
        {FilterSelector.map((item, i) =>
          <li key={i}>
            {item.display}
          </li>)}
      </div>
      <center><Link to="/" > Back to Home page</Link></center>
    </div>

  )
}

export default Info;