import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { currentexam } from "../../Function/Exam";

function ExamTest() {
  const Type = localStorage.getItem("TypeTest");
  const exam = useSelector((state) => ({ ...state }));
  const Exid = exam.examStore.exam.examid;
  const [data, setData] = useState([]);
  const Data = Object.values(data);
  const [counter, setCounter] = useState(2);
  const [min, setMin] = useState(0);
  useEffect(() => {
    //code
    loadData(Exid);
  }, [Exid]);

  useEffect(() => {
    //code
    counter >= 0 && setTimeout(() => countdown(), 1000);
  }, [counter]);

  function loadData(authtoken) {
    currentexam(authtoken).then((res) => {
      setData(res.data[0].exdata);
    });
  }

  function countdown() {
    if (counter == 0 && min !== 0 ) {
      setMin(min - 1);
      setCounter(59);
    }else{
      setCounter(counter-1);
    } 
  }

  if (Type == "Easy") {
    return (
      <div>
        EZ
      </div>
    )
  } else {  
      if(counter < 0){
        return (
        <div>Time OUT</div>
        )
      }else{
        return (
          <div>
            Time = 0:{min}:{counter}
          </div>
        )
      }
  }
}

export default ExamTest;
