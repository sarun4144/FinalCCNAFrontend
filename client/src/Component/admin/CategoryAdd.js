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
      text: "คุณต้องการจะลบ Category ใช่หรือไม่",
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        removeCategory(Token, id).then((res) => {
          console.log("Delete", res);
          Swal.fire({
            title: 'ลบ Category สำเร็จ!',
            text: res.data,
            icon: 'success'
          })
          loadData(Token)
        }).catch((err) => {
          Swal.fire({
            title: 'Error',
            text: err.response.data,
            icon: 'error'
          })
        });
      }
    })

  }
  
  return (
    <div className='adminwrap'>
      <AdminToolbar />
      <div className='admincontainer' >
        <div className="admin-cat-manage">
          <div className="admin-card-header"><h1>Category Management Page</h1></div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label form="exampleFormControlInput1">Category Name</label>
              <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Category Name" rows="3" name="name" onChange={handleChange} required />
            </div>

            <br />

            <button type="submit" className="btn btn-primary">Submit</button>

          </form>
          <br />
          <hr />
          <br />
          <div className="admin-card-header"><h1> Category List </h1></div>
          <br />
          <ul className="list-group">
            {category.map((item, index) =>
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {item.name}
                <button type="button" className="btn btn-danger" onClick={() => handleRemove(item._id)}>
                  <span className="badge badge-light">X</span>
                </button>
              </li>
            )}
          </ul>
          <br />
        </div>
      </div>
    </div>

  )
}

export default CategoryAdd