import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom"
import "./ExampleTest.css"
import { currentexam } from "../../Function/Exam"
import { useSelector } from "react-redux";
import { BiTimer } from "react-icons/bi";
import Confirm from "../../Alert/Confirm";
import Swal from 'sweetalert2'

function ExampleTest() {
  const navigate = useNavigate();
  const exam = useSelector((state) => ({ ...state }))
  const Token = exam.examStore.exam.examid
  const Catname = exam.examStore.exam.category
  const [exame, setData] = useState([]);

  useEffect(() => {
    //code
    localStorage.removeItem("TypeTest")
    loadData(Token)
  }, [Token]);

  const loadData = (authtoken) => {
    currentexam(authtoken).then(res => {
      setData(res.data)
    }).catch(err => {
      console.log(err.response.data)
    })
  }

  function Easy (){
    Confirm.fire({
      title: 'ยืนยัน!!',
      text: "คุณต้องการจะทำข้อสอบ Easy ใช่หรือไม่",
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'ดำเนินการสำเร็จ',
          text: 'ไปที่หน้าทำข้อสอบ',
          icon: 'success'
        })
        localStorage.setItem('TypeTest', "Easy")
        navigate("/user/examtest")
      }
    })
  }
  function Hard (){
    Confirm.fire({
      title: 'ยืนยัน!!',
      text: "คุณต้องการจะทำข้อสอบ Hard ใช่หรือไม่",
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'ดำเนินการสำเร็จ',
          text: 'ไปที่หน้าทำข้อสอบ',
          icon: 'success'
        })
        localStorage.setItem('TypeTest', "Hard")
        navigate("/user/examtest")
      }
    })
  }
  return (
    <div className="Excards_wrap">
      <div className="Excard_item">
        <div className="Excard_inner">
          <div className="Exrole_name">
            <BiTimer /> 01 : 00 : 00
          </div>
          <div className="Extext">
            นี่คือการทดลองทำข้อสอบ โดยหากคุณสามารถทำได้เสร็จภายใน 5 นาที แสดงว่าาคุณมีความพร้อมที่จะไปสอบจริงในระดับนีงแล้ว
            <ul>
              <li>ในข้อนี่้จะมีคำถามทั้งหมด 60 คำถาม</li>
              <li>ในแต่ละข้ออาจจะมีตัวเลือกที่ถูกต้องมากว่า 1 ข้อ</li>
              <li>แบบทดสอบนี้มีความใกล้เคียงกับแบบทดสอบจริง</li>
            </ul>
            <div>
              ข้อสอบที่คุณเลือกคือ
              {exame.map((item, idex) =>
                <ul key={idex}>
                  <li>ชื่อ: {item.name}</li>
                  <li>เนื้อหา: {item.title}</li>
                  <li>หมวดหมู่: {Catname}</li>
                </ul>
              )}
            </div>
            เลือกความยาก
            <br />
            <div >
              <button className="Exbutton1" onClick={Easy}>ง่าย</button>
              ระดับความยาก Easy ระดับนี่จะไม่มีการจับเวลาสามารถทำได้เรื่อยๆ
            </div>
            <div >
              <button className="Exbutton2" onClick={Hard}>ยาก</button>
              ระดับความยาก Hard ระดับนี่จะมีการจับเวลา 1 ชม. หากทำไม่ทันก่อนหมดเวลาจะถือว่าข้อสอบชุดนี้ได้ 0 คะแนน
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ExampleTest;