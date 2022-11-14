import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { currentexam, HardRecord } from "../../Function/Exam";
import { useCookies } from 'react-cookie';
import "./ExamTestHard.css";

import { Hardlog } from "../../Function/Person"


function ExamTestEasy() {
    const exam = useSelector((state) => ({ ...state }));
    const Exid = exam.examStore.exam.examid
    const UserID = exam.userStore.user.ObjectID
    const [data, setData] = useState([]);
    const Data = Object.values(data);

    const [log, setlog] = useState([]);
    const Log = Object.values(log);


    const [counter, setCounter] = useState(59);
    const [min, setMin] = useState(59);

    const [counter2, setCounter2] = useState(0);
    const [min2, setMin2] = useState(0);

    //Question 
    const [showResults, setShowResults] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [score, setScore] = useState(0);
    const [Record, setRecord] = useState(0);
    const Data2 = Data.slice(currentQuestion, currentQuestion + 1)
    const RecordArray = Object.values(Record)
    //Selector
    const [Selector, setSelector] = useState(0)
    const [ANSCount, setANSCount] = useState(5)
    const [Block, setBlock] = useState(false)
    const [selectValue, setselectValue] = useState(0)
    const selectValueS = Object.values(selectValue)

    //Answer
    const [Answerdetail, setAnswerdetail] = useState(false);
    const [ANSiscorrect, setANSiscorrect] = useState(false);

    //cookie
    const [cookies, setCookie] = useCookies(['Result']);

//  console.log(Log.length)
    useEffect(() => {
        //code
        if (localStorage.showresult == "true") {
            setShowResults(true)
        }
        setRecord(JSON.parse(localStorage.result))
        setCurrentQuestion(parseInt(localStorage.currentQuestion))
        setScore(parseInt(localStorage.score))
    }, []);

    useEffect(() => {
        //code
        loadData(Exid);
        HardlogS(UserID)
    }, [Exid,UserID]);


    useEffect(() => {
        //code
        if (!showResults) {
        counter >= 0 && setTimeout(() => countdown(), 1000);
        }
    }, [counter]);

    useEffect(() => {
        console.log('Selector', Selector)
        if (Selector >= ANSCount) {
            console.log(ANSCount)

        }
    }, [Selector, ANSCount])

    useEffect(() => {
        console.log('ANSiscorrect', ANSiscorrect)

    }, [ANSiscorrect])

    useEffect(() => {
        console.log('Score', score)
    }, [score])

    useEffect(() => {
        console.log('selectValue', selectValue)
        console.log('selectValueS', selectValueS)
        if (Selector >= ANSCount) {
            optionClicked(selectValueS)

        }
    }, [selectValue])

    useEffect(() => {

        setANSiscorrect(false)
        setANSCount(5)
        setBlock(false)
        setSelector(0)
        setselectValue(0)
    }, [currentQuestion])

    useEffect(() => {
        if (Block) {
            localStorage.setItem('result', JSON.stringify(Record));
        }
        console.log(Record)
    }, [Record])

    function loadData(authtoken) {
        currentexam(authtoken).then((res) => {
            setData(res.data[0].exdata);
        });
    }
    function HardlogS(authtoken) {
        Hardlog(authtoken).then((res) => {
          setlog(res.data);
        });
      }

    //easyFunction
    function EasyselectCount(isCorrect, CorrectANS, index) {
        if (!document.getElementById(index).disabled) {
            if (Selector < CorrectANS.length) {
                document.getElementById(index).disabled = true
                document.getElementById(index).className = "ExamThardButton1selected"
                setselectValue({
                    ...selectValue, [`Num${index}`]: { isCorrect: isCorrect, index: index }
                })
                setANSCount(CorrectANS.length)
                setSelector(preve => preve + 1)
            } else {
                document.getElementById(selectValueS[0].index).className = "ExamThardButton1"
                document.getElementById(selectValueS[0].index).disabled = false
                delete selectValue[`Num${selectValueS[0].index}`];
                setselectValue({
                    ...selectValue, [`Num${index}`]: { isCorrect: isCorrect, index: index }
                })
                document.getElementById(index).className = "ExamThardButton1selected"

            }
        }
    }
    const optionClicked = (isCorrect) => {
        // Increment the score
        if (Selector == selectValueS.length) {
            let i = 0
            let d = 0
            while (i < isCorrect.length) {
                if (isCorrect[i].isCorrect == false) {
                    d = -1
                    console.log("False ", d)
                } else {
                    d += 1
                    console.log("True ", d)
                }
                i++
            }
            if (i == isCorrect.length && d == isCorrect.length) {
                console.log("true")
                setANSiscorrect(true)

            } else {
                console.log("false")
                setANSiscorrect(false)
            }
        } else {
            console.log("falseNA")
            if (currentQuestion < Data.length) {
                document.getElementById(isCorrect[0].index).className = "ExamThardButton1false "
            }
        }
    }
    const restartGame = () => {
        const payload = {
            Hard: RecordArray,
            UserID: UserID,
            Type: localStorage.TypeTest,
            Num: Log.length + 1,
            Time: `${min2}:${counter2}`,
            Date: Date(),
            ExamObjectid:Exid
          }
          HardRecord(Exid, payload)
            .then(res => {
              setScore(preve => 0);
              localStorage.setItem("score", 0)
              setCurrentQuestion(preve => 0);
              localStorage.setItem("currentQuestion", 0)
              setShowResults(false);
              localStorage.setItem("showresult", false)
              setRecord(false);
              localStorage.setItem("result", 0)
              setANSiscorrect(false)
              setAnswerdetail(false)
            }).catch(err => {
              console.log(err);
            })
    }
    function countdown() {
        
            if (counter == 0 && min !== 0) {
                setMin(min - 1);
                setCounter(59);
            } else {
                setCounter(counter - 1);
            }
            if (counter2 > 59) {
                setMin2(min2 + 1);
                setCounter2(0);
            } else {
                setCounter2(counter + 1);
            }
        
    }

    function gonext(Choices, Question, CorrectANS, Answerdetail, images) {
        setRecord({
            ...Record, [currentQuestion]: {
                images: images,
                Question: Question,
                Choices: Choices,
                CorrectANS: CorrectANS,
                Answerdetail: Answerdetail,
                selectValueS: selectValueS,
                ANSiscorrect: ANSiscorrect
            }
        })
        setBlock(true)
        for (var index = 0; index < Choices.length; index++) {
            document.getElementById(index + 1).className = "ExamThardButton1"
            document.getElementById(index + 1).disabled = false
        }

        if (index == Choices.length) {
            if (currentQuestion + 1 < Data.length) {
                if (ANSiscorrect) {
                    localStorage.setItem("score", score + 1)
                    setScore(preve => preve + 1)
                }
                setAnswerdetail(false)
                localStorage.setItem("currentQuestion", currentQuestion + 1)
                setCurrentQuestion(preve => preve + 1);
            } else {
                if (ANSiscorrect) {
                    localStorage.setItem("score", score + 1)
                    setScore(preve => preve + 1)
                }
                localStorage.setItem("currentQuestion", currentQuestion + 1)
                setCurrentQuestion(preve => preve + 1);
                localStorage.setItem("showresult", true)
                setShowResults(true);
            }
        }
    }
    if (counter < 0) {
        return <div>Time OUT</div>;
    } else {
        return (
            <div className="ExamThardtext">
                <>
                    {
                        showResults
                            ? (
                                <div style={{ textAlign: "center" }}>
                                    <br />
                                    <span className="ExamThardtext"> Your Score is {score} </span>
                                    <br />
                                    <span className="ExamThardtext"> ใช้เวลาไปทั้งหมด = {min2} นาที {counter2} วินาที </span>
                                    <br />
                                    <div>
                                        {RecordArray.map((item, index) =>
                                            <div>
                                                {item.images.map((pic, Ipic) =>
                                                    <img src={pic.url} />
                                                )}
                                                <div className="ExamThardQuestion">
                                                    <span style={{ fontWeight: "500" }}>Question: {index + 1}</span>
                                                    <br />
                                                    <span>{item.Question}</span>
                                                    <br />
                                                    <span>{`${item.selectValueS.length}/${item.CorrectANS.length} is Selected `}</span>
                                                </div>
                                                <br />
                                                <br />
                                                <div className="ExamThardtext">
                                                    <div className="ExamThardChoicepanel">
                                                        <div className="ExamThardtextarea">
                                                            <span>ข้อที่คุณตอบคือข้อที่</span> &nbsp;
                                                            {item.selectValueS.map((choose, iChoose) =>
                                                                iChoose < item.selectValueS.length - 1
                                                                    ? <span>{choose.index},</span>
                                                                    : <span>{choose.index}</span>
                                                            )}
                                                        </div>
                                                        <br />
                                                        {item.Choices.map((item2, idex) =>
                                                            <>
                                                                {item2.isCorrect
                                                                    ? (
                                                                        <button id={idex + 1} className="ExamThardButton1true" disabled  >
                                                                            <div className="ExamThardtextarea">
                                                                                <div className="ExamThardnumpanel">
                                                                                    {idex + 1}
                                                                                </div>
                                                                                <div className="ExamThardtextpanel">
                                                                                    {item2.text}
                                                                                </div>
                                                                            </div>
                                                                        </button>

                                                                    )
                                                                    : (
                                                                        <button id={idex + 1} className="ExamThardButton1" disabled  >
                                                                            <div className="ExamThardtextarea">
                                                                                <div className="ExamThardnumpanel">
                                                                                    {idex + 1}
                                                                                </div>
                                                                                <div className="ExamThardtextpanel">
                                                                                    {item2.text}
                                                                                </div>
                                                                            </div>
                                                                        </button>
                                                                    )
                                                                }


                                                            </>
                                                        )}

                                                    </div>
                                                    {
                                                        true
                                                            ? (<div>
                                                                {item.Answerdetail}

                                                            </div>)

                                                            : (<div>

                                                            </div>)
                                                    }
                                                    <br />
                                                </div>
                                            </div>

                                        )}
                                        <button className="ExamTeasyGobutton1" onClick={restartGame}>restartGame</button>
                                    </div>
                                </div>
                            )
                            :
                            (

                                <div className="ExamThardcards_wrap">
                                    <div className="ExamThardcard_item">
                                        <div className="ExamThardcard_inner">
                                            <div className="ExamThardrole_name">
                                                Hard
                                                Time = 0:{min}:{counter}
                                            </div>
                                            <br />
                                            {Data2.map((item, index) => (
                                                <div>
                                                    {item.images.map((pic, Ipic) =>
                                                        <img src={pic.url} />
                                                    )}
                                                    <div className="ExamThardQuestion">
                                                        <span style={{ fontWeight: "500" }}>Question: {currentQuestion + 1}</span>
                                                        <br />
                                                        <span>{item.Question}</span>
                                                        <br />
                                                        <span>{`${Selector}/${item.CorrectANS.length} is Selected `}</span>
                                                    </div>
                                                    <br />
                                                    <div className="ExamThardtext">
                                                        <div className="ExamThardChoicepanel">
                                                            {item.Choices.map((item2, idex) =>
                                                                <>
                                                                    {Block
                                                                        ? (
                                                                            <button id={idex + 1} className="ExamTeasyButton1" disabled  >
                                                                                <div className="ExamThardtextarea">
                                                                                    <div className="ExamThardnumpanel">
                                                                                        {idex + 1}
                                                                                    </div>
                                                                                    <div className="ExamThardtextpanel">
                                                                                        {item2.text}
                                                                                    </div>
                                                                                </div>
                                                                            </button>
                                                                        )
                                                                        : (
                                                                            <button id={idex + 1} className="ExamThardButton1" onClick={() => EasyselectCount(item2.isCorrect, item.CorrectANS, idex + 1)}  >
                                                                                <div className="ExamThardtextarea">
                                                                                    <div className="ExamThardnumpanel">
                                                                                        {idex + 1}
                                                                                    </div>
                                                                                    <div className="ExamThardtextpanel">
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
                                                    <button className="ExamThardGobutton1" onClick={() => gonext(item.Choices, item.Question, item.CorrectANS, item.Answerdetail, item.images)}>GONEXT</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                </>
            </div>

        );
    }
}


export default ExamTestEasy;
