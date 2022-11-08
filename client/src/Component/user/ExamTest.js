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

   //Question 
   const [showResults, setShowResults] = useState(false);
   const [currentQuestion, setCurrentQuestion] = useState(0);
   const [score, setScore] = useState(0);
  
   const Data2 = Data.slice(currentQuestion,currentQuestion+1)

  //Selector
  const [Selector ,setSelector] = useState(0)

   const restartGame = () => {
  //Question 
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const Data2 = Data.slice(currentQuestion, currentQuestion + 1)

  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  }
  function selectCount (isCorrect){
    setSelector(Selector + 1)
    optionClicked(isCorrect)

  }

  const optionClicked = (isCorrect) => {
    // Increment the score
    // if (isCorrect) {
    //   setScore(score + 1);
    // }
    // if (currentQuestion + 1 < Data.length) {
    //   setCurrentQuestion(currentQuestion + 1);
    // } else {
    //   setShowResults(true);
    // }
    console.log("S",isCorrect)
  }

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
  function gonext() {
    if (currentQuestion + 1 < Data.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  }
  
  if (Type == "Easy") {
    
    return (
      <>
      {
        showResults
        ? (<button onClick={restartGame}>restartGame</button>)
        :
      <div className="ExamTcards_wrap">
        <div className="ExamTcard_item">
          <div className="ExamTcard_inner">
            <div className="ExamTrole_name">
              Easy
            </div>

            
            {/* <div className="ExamTQuestion">
                  <span style={{ fontWeight: "500" }}>Question: {currentQuestion + 1}</span>
                  <br />
                  {Data2.map((item , idex) =>
                    <span>{item.Question}</span>
                  )}
                  <br/>
                  <button onClick={gonext}>GO</button>
                </div> */}
            {Data2.map((item, index) => (
              <div>
                <img src={item.images.url} />
                <div className="ExamTQuestion">
                  <span style={{ fontWeight: "500" }}>Question: {currentQuestion + 1}</span>
                  <br />
                  <span>{item.Question}</span>
                </div>
                <br />
                <div className="ExamTtext">
                  <div className="ExamTChoicepanel">
                    {item.Choices.map((item, idex) =>
                      <button className="ExamTButton1" onClick={() => selectCount(item.isCorrect)} >
                        <div className="ExamTtextarea">
                          <div className="ExamTnumpanel">
                            {idex + 1}
                          </div>
                          <div className="ExamTtextpanel">
                            {item.text}
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                  <br />

                  <div>
                    {item.Answerdetail}
                  </div>
                </div>
              </div>
            ))}
            <button onClick={gonext}>GO</button>
          </div>
        </div>
      </div>
  }
      </>        
    )
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
}
export default ExamTest;
