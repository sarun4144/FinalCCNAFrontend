import React, { useState, useEffect } from "react";
import { BiTimer } from "react-icons/bi";
import { useSelector } from "react-redux";
import { currentexam } from "../../Function/Exam";
import Dropdown from 'react-bootstrap/Dropdown';
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

   const questions = [
    {
      text: "What is the capital of America?",
      options: [
        { id: 0, text: "New York City", isCorrect: false },
        { id: 1, text: "Boston", isCorrect: false },
        { id: 2, text: "Santa Fe", isCorrect: false },
        { id: 3, text: "Washington DC", isCorrect: true },
      ],
    },
    {
      text: "What year was the Constitution of America written?",
      options: [
        { id: 0, text: "1787", isCorrect: true },
        { id: 1, text: "1776", isCorrect: false },
        { id: 2, text: "1774", isCorrect: false },
        { id: 3, text: "1826", isCorrect: false },
      ],
    },
    {
      text: "Who was the second president of the US?",
      options: [
        { id: 0, text: "John Adams", isCorrect: true },
        { id: 1, text: "Paul Revere", isCorrect: false },
        { id: 2, text: "Thomas Jefferson", isCorrect: false },
        { id: 3, text: "Benjamin Franklin", isCorrect: false },
      ],
    },
    {
      text: "What is the largest state in the US?",
      options: [
        { id: 0, text: "California", isCorrect: false },
        { id: 1, text: "Alaska", isCorrect: true },
        { id: 2, text: "Texas", isCorrect: false },
        { id: 3, text: "Montana", isCorrect: false },
      ],
    },
    {
      text: "Which of the following countries DO NOT border the US?",
      options: [
        { id: 0, text: "Canada", isCorrect: false },
        { id: 1, text: "Russia", isCorrect: true },
        { id: 2, text: "Cuba", isCorrect: true },
        { id: 3, text: "Mexico", isCorrect: false },
      ],
    },
  ];

   const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  }

  const optionClicked = (isCorrect) => {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < Data.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
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

  if (Type == "Easy") {
    return (
      <div className="ExamTcards_wrap">
        <div className="ExamTcard_item">
          <div className="ExamTcard_inner">
          Question: {currentQuestion + 1} out of {Data.length}
          <br/>
          <h3 className="question-text">{Data[currentQuestion].Question}</h3>
          <br/>
          <ul>
            {Data[currentQuestion].Choices.map((option,index) => {
              return (
                <li
                  key={index}
                  onClick={() => optionClicked(option.isCorrect)}
                >
                  {option}
                </li>
              );
            })}
          </ul>
            {/* <div className="ExamTrole_name">
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
                            {idex + 1}
                       </div>
                          <div className="ExamTtextpanel">
                            {item}
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                  <br/>
                 
                  <div>
                    {item.Answerdetail}
                  </div>
                </div>
              </div>
            ))} */}
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
