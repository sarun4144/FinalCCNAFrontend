import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { currentexam } from "../../Function/Exam";

function ExamTest() {
  const Type = localStorage.getItem("TypeTest")
  const exam = useSelector((state) => ({ ...state }))
  const Exid = exam.examStore.exam.examid
  const [data,setData] = useState([])
  const Data = Object.values(data);
  useEffect(() => {
    //code
    loadData(Exid)
  }, [Exid]);
  function loadData(authtoken){
    currentexam(authtoken).then((res =>{
      setData(res.data[0])

    }))
  }
  console.log(data.exdata)
  console.log(Data)
  if (Type == "Easy") {
    return (
      <div>Easy</div>
    )
  } else {
    return (
      <div>Hard</div>
    )
  }
}

export default ExamTest