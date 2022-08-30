import React,{useState} from "react";

function Register(){
    const [value,setValue] = useState({
        username:"",
        password:"",
        conpassword:""   
    })
    const handleChange = (e) =>{
        setValue({
            ...value,[e.target.name]:e.target.value,
        })
    }
    
    const handleSubmit = (e) =>{
        e.prventDefult()
        console.log(value)
        if(value.password !== value.conpassword){
            alert("รหัสผ่านไม่ตรงกัน กรุณากรอกรหัสผ่านอีกครั้ง")
        }else{
            //code
        }
    }
    return(
        <>
    <div style={{textAlign:'center'}}>
         <h1>ลงทะเบียน</h1>
        <form onSubmit={handleSubmit}>
            <label>Username :</label>
            <input type="text"name="username" onChange={handleChange}/>

            <br/><br/>
        
            <label >Password :</label>
            <input  type="password" name="password" onChange={handleChange} required/>

            <br/><br/>

            <label >Confirm-Password :</label>
            <input  type="password" name="conpassword"onChange={handleChange} required/>

            <br/><br/>
            <button disabled={value.password.length < 6}>Submit</button>
        </form>
    </div>
    </>
    )
}

export default Register;
