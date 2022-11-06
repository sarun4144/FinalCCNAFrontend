import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './Profile.css'
import * as AiIcons from "react-icons/ai";
import Swal from 'sweetalert2'
import LineChart from "./LineChart";
import RadarChart from "./RadarChart";

function Profile() {
  const user = useSelector((state) => ({ ...state }))
  const username = user.userStore.user.username
  const role = user.userStore.user.role
  const email = user.userStore.user.email
  const [data, setData] = useState([]);

  //console.log(username)
  //console.log(role)
  //console.log(email)



  const ShowEditUsername = async (id) => {
    const { value: username } = await Swal.fire({
      title: 'แก้ไข',
      input: 'text',
      inputLabel: 'ใส่ Username',
      inputPlaceholder: 'ใส่ Username ใหม่',
      confirmButtonText: 'ยืนยัน',
      confirmButtonColor: 'green',
    })
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-card-header">
          <h1>User - Profile</h1>
        </div>
        <div className="profile-card-content">
          <div>Username : {username} <AiIcons.AiFillEdit id="EditUsernameBtn" onClick={ShowEditUsername} /></div>
          <div>Role : {role}</div>
          <div>Email : {email}</div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="profile-card">
            <div className="profile-card-header"><h1>Statistics - Line Chart</h1></div>
            <div className="profile-card-content">
              <LineChart></LineChart>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="profile-card">
            <div className="profile-card-header"><h1>Statistics - Radar Chart</h1></div>
            <div className="profile-card-content">
              <RadarChart></RadarChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile