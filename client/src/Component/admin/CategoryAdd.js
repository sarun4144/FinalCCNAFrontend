//ยังไม่เสร็จ
import React, { useState, useEffect } from "react";
import { categoryAdd, listCategory, removeCategory } from "../../Function/Category";
import { useSelector } from "react-redux";
//Notify
import Swal from 'sweetalert2'
import Confirm from "../../Alert/Confirm";
import Toast from "../../Alert/Success";
//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminToolbar from "./AdminToolbar";
import './Adminhome.css'

function CategoryAdd() {
  const user = useSelector((state) => ({ ...state }))

  const [category, setData] = useState([]);
  const Token = user.userStore.user.token
  console.log("Data", category);
  useEffect(() => {
    //code
    loadData(Token)
  }, [Token]);

  const loadData = (authtoken) => {
    listCategory(authtoken).then(res => {
      console.log(res.data)
      setData(res.data)
    }).catch(err => {
      console.log(err.response.data)
    })
  }

  const [value, setValue] = useState({
    name: " "

  })
  const handleChange = (e) => {
    setValue({
      ...value, [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Value", value);
    categoryAdd(user.userStore.user.token, value).then((res) => {
      Toast.fire({
        position: 'top-end',
        icon: 'success',
        title: 'เพิ่มหมวดหมู่สำเร็จ'
      })
      loadData(Token)
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

  const handleRemove = (id) => {
    Confirm.fire({
      title: 'ยืนยัน!!',
      text: "คุณต้องการจะลบ Category ใช่หรืไม่",
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'ลบ Category สำเร็จ!',
          text: 'Category ได้ถูกลบแล้ว',
          icon: 'success'
        })
        console.log(user.userStore.user.token, id)
        removeCategory(user.userStore.user.token, id).then((res) => {
          console.log("Delete", res);
          loadData(user.userStore.user.token);
        }).catch((err) => {
          console.log(err.response);
        });
      }
    })

  }
  return (
    <div className='adminwrap'>
      <AdminToolbar/>
    <div className='admincontainer' >
      
      <h1 style={{ textAlign: "center" }}> Admin CategoryManagement Page </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label form="exampleFormControlInput1">ชื่อหวมดหมู่ข้อสอบ</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="หมวดหมู่ข้อสอบ" rows="3" name="name" onChange={handleChange} required />
        </div>

        <br />

        <button type="submit" className="btn btn-primary">Submit</button>

      </form>
      <hr />
      <h1 style={{ textAlign: "center" }}> Category List </h1>
      <ul className="list-group">
        {category.map((item) =>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            {item.name}
            <button type="button" class="btn btn-danger" onClick={() => handleRemove(item._id)}>
              <span class="badge badge-light">X</span>
            </button>
          </li>
        )}
      </ul>
    </div>
    </div>

  )
}

export default CategoryAdd