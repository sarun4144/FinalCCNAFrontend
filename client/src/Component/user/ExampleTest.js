import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ExampleTest.css";
import { currentexam } from "../../Function/Exam";
import { useSelector, useDispatch } from "react-redux";
import { BiTimer } from "react-icons/bi";
import Confirm from "../../Alert/Confirm";
import Swal from 'sweetalert2';
import { checkin } from "../../Store/examSilce";
import { listexam } from "../../Function/Exam";

function ExampleTest() {
  const user = useSelector((state) => ({ ...state }))
  const navigate = useNavigate();
  const exam = useSelector((state) => ({ ...state }))
  const Token = exam.examStore.exam.examid
  const Catname = exam.examStore.exam.category
  const [categoryName, setCategoryName] = useState('')
  const CatID = exam.examStore.exam.catid
  const [exame, setData] = useState([]);
  const [allExam, setAllExam] = useState([]);
  const role = user.userStore.user.role
  const dispatch = useDispatch()
  const [track, setTrack] = useState(false);

  useEffect(() => {
    //code
    localStorage.setItem("score", 0)
    localStorage.setItem("currentQuestion", 0)
    localStorage.setItem('result', 0);
    localStorage.removeItem("TypeTest")
    loadData(Token)
    setTrack(false)
  }, [Token, track]);

  useEffect(() => {
    setCategoryName(Catname)
    setTrack(false)
  }, [Catname, track])

  const loadData = (authtoken) => {
    currentexam(authtoken).then(res => {
      setData(res.data)
    }).catch(err => {
      console.log(err.response.data)
    })
    listexam(authtoken).then(res => {
      setAllExam(res.data)
    }).catch(err => {
      console.log(err.response.data)
    })
  }

  function Easy() {
    Confirm.fire({
      title: 'ยืนยัน!!',
      text: "คุณต้องการจะทำข้อสอบ Easy ใช่หรือไม่",
      icon: 'question',
    }).then((result) => {
      if (role) {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'ดำเนินการสำเร็จ',
            text: 'ไปที่หน้าทำข้อสอบ',
            icon: 'success'
          })
          localStorage.setItem('TypeTest', "Easy")
          navigate("/user/examtesteasy")
        }
      } else {
        Swal.fire({
          position: 'top',
          title: 'Error!',
          text: "กรุณา Login",
          icon: 'error',
          iconColor: 'Red',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'ตกลง'
        })
        navigate("/login")
      }
    })
  }
  function Hard() {
    Confirm.fire({
      title: 'ยืนยัน!!',
      text: "คุณต้องการจะทำข้อสอบ Hard ใช่หรือไม่",
      icon: 'question',
    }).then((result) => {
      if (role) {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'ดำเนินการสำเร็จ',
            text: 'ไปที่หน้าทำข้อสอบ',
            icon: 'success'
          })
          localStorage.setItem('TypeTest', "Hard")
          navigate("/user/examtesthard")
        }
      } else {
        Swal.fire({
          position: 'top',
          title: 'Error!',
          text: "กรุณา Login",
          icon: 'error',
          iconColor: 'Red',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'ตกลง'
        })
        navigate("/login")
      }
    })
  }

  const filterExamList = allExam.filter((samecatExam) => {
    { console.log(samecatExam) }
    /*{console.log(exame._id)}*/
    return samecatExam.Categoryid === CatID && samecatExam._id !== CatID;
  })

  function SeeExam(id, catid, category) {
    if (role) {
      if (role === "admin") {
        navigate("/admin/home")
      } else {
        const EXAM = {
          examid: id,
          catid: catid,
          category: category
        }
        dispatch(checkin(EXAM))
        localStorage.setItem('examid', id)
        localStorage.setItem('catid', catid)
        navigate("/user/extest")
      }
    } else {
      Swal.fire({
        position: 'top',
        title: 'Error!',
        text: "กรุณา Login",
        icon: 'error',
        iconColor: 'Red',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ตกลง'
      })
      navigate("/login")
    }
  }
  console.log(Token)
  return (
    <div className="Excards_wrap">
      <div className="Excard_item">
        <div className="Excard_inner">
          <div className="Exrole_name">
            <BiTimer /> 01 : 30 : 00
          </div>
          <div className="Extext">
            This is the simulator test
            <ul>
              <li>This Exam contain 50 question</li>
              <li>Some question may have more than 1 correct answer</li>
              <li>As close as it gets to the actual test.</li>
            </ul>
            <div>
              The Exam you choose is
              {exame.map((item, idex) =>
                <ul key={idex}>
                  <li>Name : {item.name}</li>
                  <li>Title : {item.title}</li>
                  <li>Category : {categoryName}</li>
                </ul>
              )}
              <center ><button className="btn btn-primary" onClick={() => navigate("/user/example")}>See Example</button></center>
            </div>
            Choose the difficulties
            <br />
            <div >
              <button className="Exbutton1" onClick={Easy}>Easy</button>
              Instant feedback, no time limit
            </div>
            <div >
              <button className="Exbutton2" onClick={Hard}>Hard</button>
              Show answer at the end, time limit with 1 hour
            </div>
          </div>
        </div>
        <div className="sameCat-card">
          <div className="sameCat-card-header">Exam in {Catname}</div>
          <div className="sameCat-container">
            {filterExamList.map((item, i) =>
              <>
                {
                  item._id !== Token ? (<div key={i} className='store-card'>
                    <form >
                      <div className="form-group">
                        <h1>{item.name}</h1>
                      </div>
                      <div className="form-group">
                        <h4>{item.title}</h4>
                      </div>
                      {item.CAT.map((cat, catindex) =>
                        <div key={catindex}>
                          <div className="form-group">
                            <h5>Category : {cat.name}</h5>
                          </div>
                          <button type="submit" className="btn btn-primary" onClick={() => SeeExam(item._id, item.Categoryid, cat.name)}>Enter</button>
                        </div>
                      )}
                    </form>
                  </div>)
                    :
                    (<div></div>)
                }
              </>
            )}
          </div>
        </div>
      </div>
    </div>

  )
}

export default ExampleTest;