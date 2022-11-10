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

  const Data2 = Data.slice(currentQuestion, currentQuestion + 1)

  //Selector
  const [Selector, setSelector] = useState(0)
  const [ANSCount, setANSCount] = useState(5)
  const [Block, setBlock] = useState(false)
  const [selectValue, setselectValue] = useState({})
  const selectValueS = Object.values(selectValue)

  useEffect(() => {
    //code

    loadData(Exid);
  }, [Exid]);

  useEffect(() => {
    //code
    counter >= 0 && setTimeout(() => countdown(), 1000);
  }, [counter]);

  useEffect(() => {
    console.log('Selector', Selector)
    if (Selector >= ANSCount) {
      optionClicked(selectValueS)
      setBlock(true)
    }
  }, [Selector, ANSCount])

  useEffect(() => {
    console.log('Score', score) 
  }, [score])
  
  useEffect(() => {
    setANSCount(5)
    setBlock(false)
    setSelector(0)
    setselectValue(0)
  }, [currentQuestion])

  function loadData(authtoken) {
    currentexam(authtoken).then((res) => {
      setData(res.data[0].exdata);
    });
  }

  //easyFunction
  function EasyselectCount(isCorrect, CorrectANS, index) {
    setselectValue({
      ...selectValue, [index]: { isCorrect: isCorrect, index: index }
    })
    setANSCount(CorrectANS.length)
    setSelector(Selector + 1)

  }
  const optionClicked = (isCorrect) => {
    // Increment the score
    console.log(selectValueS)
    let i = 0
    while (i < isCorrect.length) {
      if (isCorrect[i].isCorrect == false) {
        i = -1
        break
      }
      i++
    }
    if (i == isCorrect.length && i != -1) {
      setScore(score + 1)
      console.log("true")
      if (currentQuestion + 1 < Data.length) {
        setCurrentQuestion(currentQuestion + 1);

      }else {
        setShowResults(true);
      }
    } else {
      console.log("false")
      if (currentQuestion + 1 < Data.length) {
        setCurrentQuestion(currentQuestion + 1);
      }else {
        setShowResults(true);
      }
    }
  }

  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
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
            ? (
              <div>
                <span>Your Score is {score}</span>
                <br/>
                <button onClick={restartGame}>restartGame</button>
              </div>
            )
            :
            <div className="ExamTcards_wrap">
              <div className="ExamTcard_item">
                <div className="ExamTcard_inner">
                  <div className="ExamTrole_name">
                    Easy
                  </div>
                  {Data2.map((item, index) => (
                    <div>
                      <img src={item.images.url} />
                      <div className="ExamTQuestion">
                        <span style={{ fontWeight: "500" }}>Question: {currentQuestion + 1}</span>
                        <br />
                        <span>{item.Question}</span>
                        <br />
                        <br />
                        <span>{`${Selector}/${item.CorrectANS.length} is Selected `}</span>
                      </div>
                      <br />
                      <div className="ExamTtext">
                        <div className="ExamTChoicepanel">
                          {item.Choices.map((item2, idex) =>
                            <>
                              {Block
                                ? (
                                  <button id={idex + 1} name={idex + 1} className="ExamTButton1" onClick={() => EasyselectCount(item2.isCorrect, item.CorrectANS, idex + 1)} disabled  >
                                    <div className="ExamTtextarea">
                                      <div className="ExamTnumpanel">
                                        {idex + 1}
                                      </div>
                                      <div className="ExamTtextpanel">
                                        {item2.text}
                                      </div>
                                    </div>
                                  </button>
                                )
                                : (
                                  <button id={idex + 1} name={idex + 1} className="ExamTButton1" onClick={() => EasyselectCount(item2.isCorrect, item.CorrectANS, idex + 1)}  >
                                    <div className="ExamTtextarea">
                                      <div className="ExamTnumpanel">
                                        {idex + 1}
                                      </div>
                                      <div className="ExamTtextpanel">
                                        {item2.text}
                                      </div>
                                    </div>
                                  </button>
                                )
                              }
                            </>
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
export default ExamTest;
