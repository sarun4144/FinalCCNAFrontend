// rafce
import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const Navbaradmin = () => {
  return (
    <nav style={{paddingLeft:"20px",paddingTop:"20px"}}>
      <ul className="nav flex-column">

        <li className="nav-item">
          <Link to="/admin/home">แดชบอร์ด</Link>
        </li>

        <li className="nav-item">
          {/* <a href=""></a> */}
          <Link to="/admin/manageadmin"> จัดการผู้ใช้งาน</Link>
        </li>
        <li className="nav-item">
          {/* <a href=""></a> */}
          <Link to="/admin/examadd"> เพิ่มข้อสอบ</Link>
        </li>
        <li className="nav-item">
          {/* <a href=""></a> */}
          <Link to="/admin/categoryadd"> เพิ่มหมวดหมู่</Link>
        </li>
        
      </ul>
    </nav>
  );
};

export default Navbaradmin;