import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";
import {listexam } from "../Function/Exam"
function Store() {
    const user =  useSelector((state) => ({...state}))
    const [data, setData] = useState([]);
    const Token =user.userStore.user.token
    console.log("Data", data);
    useEffect(() => {
        //code
        loadData()
      }, [Token]);
    const loadData = () =>{
        listexam().then(res =>{
          setData(res.data)
        }).catch(err => {
          console.log(err.response.data)
        })
      }
  return (
  <div className="container">
    {data.map((item, index) => 
    <div className="card">
  <div className="card-header">
    {item.name}
  </div>
  <div className="card-body">
    <h5 className="card-title">Titel</h5>
    <p className="card-text">{item.title}</p>
    <Link to="/" className="btn btn-primary">ดูข้อสอบ</Link>
  </div>
</div>
 )}
    </div>
  )
}

export default Store