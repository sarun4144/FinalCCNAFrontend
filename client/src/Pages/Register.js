import React,{useState} from "react";
import {register} from '../Function/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css'
function Register(){
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
        if(value.password !== value.conpassword || value.password < 6 ){
            alert("รหัสผ่านไม่ตรงกันหรือน้อยกว่า 8 ตัว กรุณากรอกรหัสผ่านอีกครั้ง");
        }else{
            register(value)
        .then((res) => {
          console.log(res.data);
          alert("สมัครสมาชิกสำเร็จ");
        })
        .catch((err) => {
          console.log(err.response.data);
          alert(err.response.data);
        });
        }
    }
    return(
        <div className="container">
            <div className="row" >            
                <div className="col-md-6 offset-md-3"  >
                    <div className="card">
                    <div className="row">
                    <div class="col order-last"></div>
                        <div className="col" >
                    <h1 className="title">ลงทะเบียน</h1>
                    </div>
                    <div class="col order-first"></div>
                    </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group" >
                            <label>Username: </label>
                                <input className="form-control"type="text"name="username" autoFocus placeholder="ชื่อผู้ใช้" onChange={handleChange}/>
                            </div>
                                <div className="form-group">   
                            <label >Password:</label>
                                <input className="form-control" type="password" name="password" placeholder="รหัสผ่านมากกว่า 6 ตัวขึ้นไป" onChange={handleChange} required/>
                                </div>
                                <div className="form-group">
                            <label >Confirm-Password:</label>
                                <input  className="form-control"type="password" name="conpassword" placeholder="ยืนยันรหัสผ่าน"onChange={handleChange} required/>
                                </div>
                                <div className="form-group">
                            <label >Email : </label>
                                <input className="form-control" type="email" name="email"placeholder="อีเมลล์"onChange={handleChange} />
                                </div>
                                <br/> 
                                    
                            <div className="row">
                                <div className="col-4" ></div>
                                <div className="col-4"> <button className="submit" >Submit</button> </div>
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
