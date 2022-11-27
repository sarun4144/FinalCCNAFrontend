import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './Profile.css'
import * as AiIcons from "react-icons/ai";
import Swal from 'sweetalert2'
import LineChart from "./LineChart";
import LineChartHard from "./LineChartHard";
import RadarChart from "./RadarChart";
import RadarChartHard from "./RadarChartHard";
import Table from 'react-bootstrap/Table';
import { ChangeName, reads, Hardlog, Easylog } from "../../Function/Person"
import { useNavigate } from "react-router-dom";

function Profile() {
  const user = useSelector((state) => ({ ...state }))
  const Userid = user.userStore.user.ObjectID
  const Token = user.userStore.user.token
  const [data, setData] = useState([]);
  const [dataExamHard, setDataExamHard] = useState([]);
  const [dataExamEasy, setDataExamEasy] = useState([]);

  const [showLine, setShowLine] = useState("easy");
  const [showRadar, setShowRadar] = useState("easy")

  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const DataHard = Object.values(dataExamHard);
  const DataEasy = Object.values(dataExamEasy);
  //console.log(username)
  //console.log(role)
  // console.log(email)
  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  useEffect(() => {
    localStorage.removeItem("Index")
  }, [])
  useEffect(() => {
    loadData(Token, Userid)
  }, [Userid])

  useEffect(() => {
    loadExamData(Userid)
    loadExamDataE(Userid)
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
  function loadExamDataE(id) {
    Easylog(id).then((res) => {
      setDataExamEasy(res.data);
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

  function Seresult(index) {
    localStorage.setItem("Index",index)
    navigate("/user/ResultHard");
  }
  function SeresultEasy(index) {
    localStorage.setItem("Index",index)
    navigate("/user/ResultEasy");
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
            <button className="btn btn-success" onClick={() => setShowLine("easy")}>EASY</button>&nbsp;
            <button className="btn btn-warning" onClick={() => setShowLine("hard")}>HARD</button>
            <div className="profile-card-content">
             <>{ showLine === "easy" ? <LineChart></LineChart> : <LineChartHard></LineChartHard>}</>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="profile-card">
            <div className="profile-card-header"><h1>Statistics - Radar Chart</h1></div>
            <button className="btn btn-success" onClick={() => setShowRadar("easy")}>EASY</button>&nbsp;
            <button className="btn btn-warning" onClick={() => setShowRadar("hard")}>HARD</button>
            <div className="profile-card-content">
              <>{ showRadar === "easy" ? <RadarChart></RadarChart> : <RadarChartHard></RadarChartHard>}</>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-card">
        <div className="profile-card-header"><h1>History</h1></div>
        <div className="row">
          <div className="col-md-6" style={{ textAlign: "center" }}>
            <h2>Easy</h2>
            <div className="profile-card-content">
              <Table className="table">
                <thead>
                  <tr>
                    <th scope="col">ExamName</th>
                    <th scope="col">Title</th>
                    <th scope="col">Category</th>
                    <th scope="col">Date</th>
                    <th scope="col">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {DataEasy.map((item, index) =>
                    <tr key={index}>
                      <td >
                        <div className="SeeexamEasy" onClick={()=>SeresultEasy(index+1)}>
                          {item.Examname}
                        </div>
                      </td>
                      <td>{item.Title}</td>
                      <td>{item.Category}</td>
                      <td>{item.Date.substring(0, 24)}</td>
                      <td>{item.Score}</td>
                    </tr>

                  )}

                </tbody>
              </Table>
            </div>
          </div>
          <div className="col-md-6" style={{ textAlign: "center" }}>
            <h2>Hard</h2>
            <div className="profile-card-content">
              <Table className="table">
                <thead>
                  <tr>
                    <th scope="col">ExamName</th>
                    <th scope="col">Title</th>
                    <th scope="col">Category</th>
                    <th scope="col">Time use</th>
                    <th scope="col">Date</th>
                    <th scope="col">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {DataHard.map((item, index) =>
                    <tr key={index}>
                      <td >
                        <div className="SeeexamHard" onClick={() => Seresult(index+1)}>
                          {item.Examname}
                        </div>
                      </td>
                      <td>{item.Title}</td>
                      <td>{item.Category}</td>
                      <td>{item.Time}</td>
                      <td>{item.Date.substring(0, 24)}</td>
                      <td>{item.Score}</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Profile