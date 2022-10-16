import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listexam } from "../Function/Exam"
import { checkin } from "../Store/examSilce"
import { checkout } from "../Store/examSilce";
//Notify

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function Store() {
  const navigate = useNavigate();
  const user = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()
  const [exame, setData] = useState([]);
  const Token = user.userStore.user.token
  useEffect(() => {
    //code
    dispatch(checkout(null))
    loadData(Token)
  }, [Token,dispatch]);
  const loadData = (authtoken) => {
    listexam(authtoken).then(res => {
      setData(res.data)
    }).catch(err => {
      console.log(err.response.data)
    })
  }

  function EditBTN(id) {
    const EXAM = {
      examid: id,
    }
    dispatch(checkin(EXAM))
    localStorage.setItem('examid', id)
    navigate("/admin/examchoices");
  }
  function SeeExam(id) {
    navigate("/admin/home");
  }

  try {
    if (user.userStore.user.role === 'admin') {
      return (
        <div className='container'>

          {exame.map((item) =>
            <div className='card'>
              <div >
                <div className="form-group">
                  <h1 form="exampleFormControlInput1" >{item.name}</h1>
                </div>
                <div className="form-group">
                  <h4 form="exampleFormControlInput1" >{item.title}</h4>
                </div>
                <button type="submit" className="btn btn-primary" onClick={() => SeeExam(item._id)}>ดูข้อสอบ</button>
                <button type="submit" className="btn btn-danger" onClick={() => EditBTN(item._id)}>แก้ไข</button>
              </div>
            </div>
          )}
        </div>

      )
    }
    return (
      <div className='container'>
        {exame.map((item) =>
          <div className='card'>
            <form >
              <div className="form-group">
                <h1 form="exampleFormControlInput1" >{item.name}</h1>
              </div>
              <div className="form-group">
                <h4 form="exampleFormControlInput1" >{item.title}</h4>
              </div>
              <button type="submit" className="btn btn-primary">ดูข้อสอบ</button>
            </form>
          </div>
        )}
      </div>

    )
  } catch (error) {
    <div className='container'>
      {exame.map((item) =>
        <div className='card'>
          <form >
            <div className="form-group">
              <h1 form="exampleFormControlInput1" >{item.name}</h1>
            </div>
            <div className="form-group">
              <h4 form="exampleFormControlInput1" >{item.title}</h4>
            </div>
            <button type="submit" className="btn btn-primary">ดูข้อสอบ</button>
          </form>
        </div>
      )}
    </div>

  }
}


export default Store