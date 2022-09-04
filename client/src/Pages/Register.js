import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import {register} from '../Function/Auth';
import Swal from 'sweetalert2'
import Toast from "../Alert/Success";
import './Register.css'

function Register(){
    const navigate = useNavigate();
    const [value,setValue] = useState({
        username:" ",
        password:" ",
        conpassword:" " ,
        email:" " 
    })

    const handleChange = (e) =>{
        setValue({
            ...value,[e.target.name]:e.target.value,
        })
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(value);
        if(value.password !== value.conpassword ){
            Swal.fire({
                position:'top',
                title: 'รหัสผ่านไม่ตรงกัน',
                text: 'กรุณากรอกรหัสใหม่',
                icon: 'error',
                iconColor:'Red'
              })
        }else{
            register(value).then((res) => {    
                Toast.fire({
                    position:'top-end',
                    icon:'success',
                    title:'สมัครสมาชิกสำเร็จ'
                })  
            navigate("/login")
        })
        .catch((err) => {
            Swal.fire({
                position:'top',
                title: 'Error!',
                text: err.response.data,
                icon: 'error',
                iconColor:'Red',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ตกลง'
              })
        });
        }
    }
    return(
        <div className="container">
            <div className="row" >            
                <div className="col-md-6 offset-md-3"  >
                    <div className="card">
                    <div className="row">
                    <div class="col-1"></div>
                        <div className="col-10" style={{backgroundColor:'lightblue'}} >
                    <h1 className="title">ลงทะเบียน</h1>
                    </div>
                    <div class="col-1"></div>
                    </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group" >
                            <label>Username: </label>
                                <input className="form-control"type="text"name="username" autoFocus placeholder="ชื่อผู้ใช้" onChange={handleChange}/>
                            </div>
                            <br/>
                                <div className="form-group">   
                            <label >Password:</label>
                                <input className="form-control" type="password" name="password" placeholder="รหัสผ่านมากกว่า 6 ตัวขึ้นไป" onChange={handleChange} required/>
                                </div>
                            <br/>
                                <div className="form-group">
                            <label >Confirm-Password:</label>
                                <input  className="form-control"type="password" name="conpassword" placeholder="ยืนยันรหัสผ่าน"onChange={handleChange} required/>
                                </div>
                            <br/>   
                                <div className="form-group">
                            <label >Email : </label>
                                <input className="form-control" type="email" name="email"placeholder="อีเมลล์"onChange={handleChange} />
                                </div>
                                
                                <br/> 
                                <div className="row">
                                <div className="col-4" ></div>
                                <div className="col-4" > <button className="submit">ลงทะเบียน</button> </div>
                                <div className="col-4"></div>
                            
                            </div>
                            
                             
                        </form>
            </div>
        </div>
    </div>
    </div>
    )
}

export default Register;
