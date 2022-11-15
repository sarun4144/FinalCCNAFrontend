import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './Profile.css'
import * as AiIcons from "react-icons/ai";
import Swal from 'sweetalert2'
import LineChart from "./LineChart";
import RadarChart from "./RadarChart";

import {ChangeName ,reads} from "../../Function/Person"

function Profile() {
  const user = useSelector((state) => ({ ...state }))
  const Userid = user.userStore.user.ObjectID
  const Token = user.userStore.user.token
  const username = user.userStore.user.username
  const role = user.userStore.user.role
  const email = user.userStore.user.email
  const [data, setData] = useState([]);
  const [values, setvalues] = useState([]);

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
    if(username) {
      console.log("True")
      setvalues({ ...values, id: id, username: username });
      ChangeName(user.userStore.user.token,values.id, {values})
        .then(res => {
          Swal.fire({
            title: 'แก้ไข Password สำเร็จ',
            confirmButtonText: 'ยืนยัน',
            confirmButtonColor: 'green',
          })
          window.location.reload();
        }).catch(err => {
          console.log(err.response)
        })
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-card-header">
          <h1>User - Profile</h1>
        </div>
        <div className="profile-card-content">
          <div>Username : {username} <AiIcons.AiFillEdit id="EditUsernameBtn" onClick={()=>ShowEditUsername(Userid)} /></div>
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