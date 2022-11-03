import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { currentexam } from "../../Function/Exam";

function ExamTest() {
  const Type = localStorage.getItem("TypeTest")
  const exam = useSelector((state) => ({ ...state }))
  const Exid = exam.examStore.exam.examid
  const [data,setData] = useState([])
  const Data = Object.values(data);
  const [counter, setCounter] = React.useState(60);
  useEffect(() => {
    //code
    loadData(Exid)
  }, [Exid]);

  useEffect(() => {
    //code
    loadData(Exid)
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  function loadData(authtoken){
    currentexam(authtoken).then((res =>{
      setData(res.data[0].exdata)

    }))
  }
  if (Type == "Easy") {
    return (
      <div>Countdown: {counter}</div>
    )
  } else {
    return (
      <div>Hard</div>
    )
  }
}

export default ExamTest