import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './Profile.css'
import * as AiIcons from "react-icons/ai";
import Swal from 'sweetalert2'
import LineChart from "./LineChart";
import RadarChart from "./RadarChart";

import { ChangeName, reads ,Hardlog,Easylog} from "../../Function/Person"

function Profile() {
  const user = useSelector((state) => ({ ...state }))
  const Userid = user.userStore.user.ObjectID
  const Token = user.userStore.user.token
  const [data, setData] = useState([]);
  const [dataExamHard, setDataExamHard] = useState([]);

  //console.log(username)
  //console.log(role)
  //console.log(email)
  console.log(dataExamHard)
  useEffect(() => {
    loadData(Token, Userid)
  }, [Userid])
  useEffect(() => {
    loadExamData(Userid)
  }, [Userid])

  function loadData(authtoken, id) {
    reads(authtoken, id).then((res) => {
      setData(res.data);
    });
  }
  function loadExamData(id) {
    Hardlog(id).then((res) => {
      setDataExamHard(res.data);
    });
  }

  const ShowEditUsername = async (id) => {
    const { value: Newusername } = await Swal.fire({
      title: 'แก้ไข',
      input: 'text',
      inputLabel: 'ใส่ Username',
      inputPlaceholder: 'ใส่ Username ใหม่',
      confirmButtonText: 'ยืนยัน',
      confirmButtonColor: 'green',
    })
    if (Newusername) {
      console.log("True")
      ChangeName(user.userStore.user.token, id, { Newusername })
        .then(res => {
          Swal.fire({
            title: 'แก้ไข Username สำเร็จ',
            confirmButtonText: 'ยืนยัน',
            confirmButtonColor: 'green',
          })
          loadData(Token, Userid)
        }).catch(err => {
          Swal.fire({
            title: err.response.data,
            confirmButtonText: 'ยกเลิก',
            confirmButtonColor: 'red',
          })
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
          <div>Username : {data.username} <AiIcons.AiFillEdit id="EditUsernameBtn" onClick={() => ShowEditUsername(Userid)} /></div>
          <div>Role : {data.role}</div>
          <div>Email : {data.email}</div>
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
      <div className="profile-card">
        <div className="profile-card-header"><h1>History</h1></div>
        <div className="row">
          <div className="col-md-6" style={{textAlign:"center"}}>
          <h2>Easy</h2>
          <div className="profile-card-content">

          </div>
          </div>
          <div className="col-md-6" style={{textAlign:"center"}}>
          <h2>Hard</h2>
          <div className="profile-card-content">
            
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile