// rafce
import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navadmin.css';
const Navbaradmin = () => {
  return (
    <div className="navadmin-column">
      <div className="navadmin-header"><h2>Admin Tool</h2></div>
      <ul >

        <li className="navadmin-item">
          <Link to="/admin/home">Dashboard</Link>
        </li>

        <li className="navadmin-item">
          {/* <a href=""></a> */}
          <Link to="/admin/manageadmin">User Management</Link>
        </li>
        <li className="navadmin-item">
          {/* <a href=""></a> */}
          <Link to="/admin/examadd"> Add Exam</Link>
        </li>
        <li className="navadmin-item">
          {/* <a href=""></a> */}
          <Link to="/admin/categoryadd"> Edit Category</Link>
        </li>
        <li className="navadmin-item">
          {/* <a href=""></a> */}
          <Link to="/admin/Report"> Report</Link>
        </li>
        
      </ul>
    </div>
  );
};

export default Navbaradmin;