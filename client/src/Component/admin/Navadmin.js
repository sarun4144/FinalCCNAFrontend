// rafce
import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navadmin.css';
const Navbaradmin = () => {
  return (
    <div className="navadmin-column">
      <ul >

        <li className="navadmin-item">
          <Link to="/admin/home">แดชบอร์ด</Link>
        </li>

        <li className="navadmin-item">
          {/* <a href=""></a> */}
          <Link to="/admin/manageadmin"> จัดการผู้ใช้งาน</Link>
        </li>
        <li className="navadmin-item">
          {/* <a href=""></a> */}
          <Link to="/admin/examadd"> เพิ่มข้อสอบ</Link>
        </li>
        <li className="navadmin-item">
          {/* <a href=""></a> */}
          <Link to="/admin/categoryadd"> เพิ่มหมวดหมู่</Link>
        </li>
        
      </ul>
    </div>
  );
};

export default Navbaradmin;