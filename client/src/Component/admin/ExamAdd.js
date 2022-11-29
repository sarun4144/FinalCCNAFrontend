import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { examadd } from '../../Function/Exam'
import { listCategory } from "../../Function/Category";
import { Reportadd } from "../../Function/Reportlog";
import Swal from 'sweetalert2'
import Toast from "../../Alert/Success";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminToolbar from "./AdminToolbar";
import './Adminhome.css'
import { useSelector } from "react-redux";
function ExamAdd() {
  const navigate = useNavigate();
  const store = useSelector((state) => ({ ...state }))
  
  const [Data, setData] = useState([]) 
  const [value, setValue] = useState({
    name: " ",
    title: " ",
    Categoryid:" "
  })
 
  useEffect(() => {
    loadData()

  }, [])

  function loadData() {
    listCategory().then((res) => {
      setData(res.data)
    }).catch(err => {
      console.log(err);
    })
  }
  const handleChange = (e) => {
    setValue({
      ...value, [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Value", value);
    if(value.Categoryid == " "){
      value.Categoryid = Data[0]._id
    }
    examadd(store.userStore.user.token,value).then((res) => {
      Toast.fire({
        position: 'top-end',
        icon: 'success',
        title: 'เพิ่มข้อสอบสำเร็จ'
      })
      const Reportload ={
        Name : res.data.Name
      }
      Reportadd(res.data.Id,Reportload).then((res) => {
        
        
      //  navigate("/store")
      })
    })
      .catch((err) => {
        Swal.fire({
          position: 'top',
          title: 'Error!',
          text: err.response.data,
          icon: 'error',
          iconColor: 'Red',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'ตกลง'
        })
        console.log(err.response.data)
      });

  }
  return (
    <div className='adminwrap'>
      <AdminToolbar/>
    <div className='admincontainer'>
      <div className='examadd-card'>
        <div className="admin-card-header"><h1>ADD EXAM</h1></div>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Exam name</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Exam name" rows="3" name="name" onChange={handleChange} required />
          </div>
          <br />

          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Title</label>
            <input className="form-control" id="exampleFormControlInput1" name="title" onChange={handleChange} required></input>
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Category</label>

            <select className="form-control" id="exampleFormControlSelect1" name="Categoryid" onChange={handleChange}>
              
              {Data.map((item, index) =>
                <option key={index} value={item._id}>{item.name}</option>

              )}
            </select>

          </div>
          <br />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default ExamAdd