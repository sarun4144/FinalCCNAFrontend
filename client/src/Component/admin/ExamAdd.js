import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { examadd }from '../../Function/Exam'
import Swal from 'sweetalert2'
import Toast from "../../Alert/Success";
import 'bootstrap/dist/css/bootstrap.min.css';
function ExamAdd() {
  const navigate = useNavigate();
  const [value,setValue] = useState({
      name:" ",
      title:" ",
  })

  const handleChange = (e) =>{
      setValue({
          ...value,[e.target.name]:e.target.value,
      })
  }
  
  const handleSubmit = (e) =>{
      e.preventDefault()
      console.log("Value",value);
        examadd(value).then((res) => {    
              Toast.fire({
                  position:'top-end',
                  icon:'success',
                  title:'เพิ่มข้อสอบสำเร็จ'
              })  
          navigate("/store")
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
            console.log(err)
      });
      
  }
  return (
    <div className='container'>
        <div className='card'>
    <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label form="exampleFormControlInput1">ชื่อข้อสอบ</label>
      <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="ชื่อข้อสอบ" rows="3" name="name" onChange={handleChange} required/>
    </div>
    <br/>

    <div className="form-group">
      <label form="exampleFormControlInput1">Titel</label>
      <input className="form-control" id="exampleFormControlInput1" name="title"onChange={handleChange} required></input>
    </div>
    <br/>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  </div>
  </div>
  )
}

export default ExamAdd