import React, { useState } from "react";
import {login} from '../Function/Auth'
import {Logins} from '../Store/userSilce'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import { toast } from 'react-toastify';
import { useDispatch} from 'react-redux'
function Login({ history }) {
    const dispatch = useDispatch();
    const [value,setValue] = useState({
         email:" " ,
         password:" "
       
    })
    const handleChange = (e) =>{
        setValue({
            ...value,[e.target.name]:e.target.value,
        })
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(value);
        login(value).then((res) => {
          console.log(res.data);
          toast.success("ล็อกอินสำเร็จ")
          dispatch(Logins(value))
          history.push('/')
        })
        .catch((err) => {
          console.log(err.response.data);
          toast.error(err.response.data);
        });
        }

    return(
        <div className="container">
            <div className="row" >            
                <div className="col-md-6 offset-md-3"  >
                    <div className="card">
                        <div className="row">
                            <div class="col-1 "></div>
                            <div className="col-10"  style={{backgroundColor:'lightblue'}}> 
                                 <h1 className="title">เข้าสู่ระบบ</h1>
                            </div>
                            <div class="col-1"></div>
                         </div>
                         <form onSubmit={handleSubmit}>
                         <div className="form-group" >
                            <label>Email: </label>
                                <input className="form-control"type="email"name="email" autoFocus placeholder="Email" onChange={handleChange}/>
                            </div>
                            <br/>
                                <div className="form-group">   
                            <label >Password:</label>
                                <input className="form-control" type="password" name="password" placeholder="รหัสผ่าน" onChange={handleChange} required/>
                                </div>
                                <br/>

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

  