import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userlogin } from '../Function/Auth'
import { login } from '../Store/userSilce'
import Swal from 'sweetalert2'
import Toast from "../Alert/Success";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import { useDispatch } from 'react-redux'
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const [value, setValue] = useState({
    email: " ",
    password: " "

  })

  const roleBaseRedirect = (role) => {
    console.log(role);
    if (role === "admin") {
      navigate("/admin/home");
    } else {
      navigate("/user/home");
    }
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value, })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    userlogin(value).then((res) => {
      setloading(false);
      console.log(res.data);
      Toast.fire({
        position: 'top-end',
        icon: 'success',
        title: 'เข้าสู่ระบบสำเร็จ'
      })
      const payload = {
        token: res.data.token,
        username: res.data.payload.user.username,
        role: res.data.payload.user.role
      }
      dispatch(login(payload))
      localStorage.setItem('token', res.data.token)
      roleBaseRedirect(res.data.payload.user.role);
    })
      .catch((err) => {
        console.log(err.response.data);
        setloading(false);
        Swal.fire({
          position: 'top',
          title: 'Error!',
          text: err.response.data,
          icon: 'error',
          iconColor: 'Red',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'ตกลง'
        })
      });
  }



  return (
    <div className="container">
      <div className="row" >
        <div className="col-md-6 offset-md-3"  >

          <div className="card">
            <div className="row">
              <div className="col-1 "></div>
              <div className="col-10" style={{ backgroundColor: 'lightblue' }}>
                {loading
                  ? <h1 className="title">เข้าสู่ระบบ</h1>
                  : <h1 className="title">เข้าสู่ระบบผิดพลาด</h1>
                }

              </div>
              <div className="col-1"></div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group" >
                <label>Email: </label>
                <input className="form-control" type="email" name="email" autoFocus placeholder="Email" onChange={handleChange} />
              </div>
              <br />
              <div className="form-group">
                <label >Password:</label>
                <input className="form-control" type="password" name="password" placeholder="รหัสผ่าน" onChange={handleChange} required />
              </div>
              <br />

              <div className="row">
                <div className="col-4" ></div>
                <div className="col-4" > <button className="submit">Login</button> </div>
                <div className="col-4"></div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;

