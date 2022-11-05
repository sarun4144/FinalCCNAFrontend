import React, { useState, useEffect } from "react";
import { BiTimer } from "react-icons/bi";
import { useSelector } from "react-redux";
import { currentexam } from "../../Function/Exam";

import "./ExamTest.css";
function ExamTest() {
  const Type = localStorage.getItem("TypeTest");
  const exam = useSelector((state) => ({ ...state }));
  const Exid = exam.examStore.exam.examid;
  const [data, setData] = useState([]);
  const Data = Object.values(data);
  const [counter, setCounter] = useState(59);
  const [min, setMin] = useState(59);

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
    if (counter == 0 && min !== 0) {
      setMin(min - 1);
      setCounter(59);
    } else {
      setCounter(counter - 1);
    }
  }

  if (Type == "Easy") {
    return (
      <div className="ExamTcards_wrap">
        <div className="ExamTcard_item">
          <div className="ExamTcard_inner">
            <div className="ExamTrole_name">
              <BiTimer /> 00:{min}:{counter}
            </div>
            {Data.map((item, index) => (
              <div>
                <img src={item.images.url} />
                <div className="ExamTQuestion">
                  <span style={{ fontWeight: "500" }}>Question: {index + 1}</span>
                  <br />
                  <span>{item.Question}</span>
                </div>
                <br />
                <div className="ExamTtext">
                  <div className="ExamTChoicepanel">
                    {item.Choices.map((item, idex) =>
                        <button className="ExamTButton1">
                          <div className="ExamTtextarea">
                        <div className="ExamTnumpanel">
                          {idex + 1 }
                        </div>
                        <div className="ExamTtextpanel">
                          {item}
                        </div>
                        </div>
                        </button>
                    )}
                  </div>
                      <div>
                        {item.Answerdetail}
                      </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    if (counter < 0) {
      return <div>Time OUT</div>;
    } else {
      return (
        <div>
          Time = 0:{min}:{counter}
        </div>
      );
    }
  }
}

export default ExamTest;
