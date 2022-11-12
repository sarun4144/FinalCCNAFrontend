import React, { useState, useEffect } from "react";
import { BiTimer } from "react-icons/bi";
import { useSelector } from "react-redux";
import { currentexam } from "../../Function/Exam";

import "./ExamTestEasy.css";

function ExamTestEasy() {
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

  //Answer
  const [Answerdetail, setAnswerdetail] = useState(false);

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
    document.getElementById(index).className = "ExamTeasyButton1selected"
    setselectValue({
      ...selectValue, [`${99 - index}`]: { isCorrect: isCorrect, index: index }
    })
    setANSCount(CorrectANS.length)
    setSelector(Selector + 1)

  }
  const optionClicked = (isCorrect) => {
    // Increment the score
    if (Selector == selectValueS.length) {
      let i = 0
      let d = 0
      while (i < isCorrect.length) {
        if (isCorrect[i].isCorrect == false) {
          document.getElementById(isCorrect[i].index).className = "ExamTeasyButton1false "
          d = -1

        } else {
          d += 1
          document.getElementById(isCorrect[i].index).className = "ExamTeasyButton1true"
        }
        i++
      }
      if (i == isCorrect.length && d != -1) {
        setAnswerdetail(true)
        console.log("true")
        if (currentQuestion + 1 < Data.length) {
          // setCurrentQuestion(currentQuestion + 1);
          setScore(score + 1)
        } else {
          setShowResults(true);
        }
      } else {
        console.log("false")
        if (currentQuestion + 1 < Data.length) {
          // setCurrentQuestion(currentQuestion + 1);

        } else {
          setShowResults(true);
        }
      }
    } else {
      console.log("falseNA")
      if (currentQuestion + 1 < Data.length) {
        // setCurrentQuestion(currentQuestion + 1);
        document.getElementById(isCorrect[0].index).className = "ExamTeasyButton1false "
      } else {
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

  function gonext(Choices) {
    for (var index = 0; index < Choices.length; index++) {
      document.getElementById(index + 1).className = "ExamTeasyButton1"
    }
    if (index == Choices.length) {
      if (currentQuestion + 1 < Data.length) {
        setAnswerdetail(false)
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
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
                <br />
                <button onClick={restartGame}>restartGame</button>
              </div>
            )
            :
            <div className="ExamTeasycards_wrap">
              <div className="ExamTeasycard_item">
                <div className="ExamTeasycard_inner">
                  <div className="ExamTeasyrole_name">
                    Easy
                  </div>
                  {Data2.map((item, index) => (
                    <div>
                      <img src={item.images.url} />
                      <div className="ExamTeasyQuestion">
                        <span style={{ fontWeight: "500" }}>Question: {currentQuestion + 1}</span>
                        <br />
                        <span>{item.Question}</span>
                        <br />
                        <span>{`${Selector}/${item.CorrectANS.length} is Selected `}</span>
                      </div>
                      <br />
                      <div className="ExamTeasytext">
                        <div className="ExamTeasyChoicepanel">
                          {item.Choices.map((item2, idex) =>
                            <>
                              {Block
                                ? (
                                  <button id={idex + 1} name={idex + 1} className="ExamTeasyButton1" onClick={() => EasyselectCount(item2.isCorrect, item.CorrectANS, idex + 1)} disabled  >
                                    <div className="ExamTeasytextarea">
                                      <div className="ExamTeasynumpanel">
                                        {idex + 1}
                                      </div>
                                      <div className="ExamTeasytextpanel">
                                        {item2.text}
                                      </div>
                                    </div>
                                  </button>
                                )
                                : (
                                  <button id={idex + 1} name={idex + 1} className="ExamTeasyButton1" onClick={() => EasyselectCount(item2.isCorrect, item.CorrectANS, idex + 1)}  >
                                    <div className="ExamTeasytextarea">
                                      <div className="ExamTeasynumpanel">
                                        {idex + 1}
                                      </div>
                                      <div className="ExamTeasytextpanel">
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
                        {
                          Answerdetail
                            ? (<div>
                              {item.Answerdetail}

                            </div>)

                            : (<div>

                            </div>)
                        }
                      </div>
                      <br />
                      <button className="ExamTeasyGobutton1" onClick={() => gonext(item.Choices)}>GONEXT</button>
                    </div>
                  ))}
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
export default ExamTestEasy;
