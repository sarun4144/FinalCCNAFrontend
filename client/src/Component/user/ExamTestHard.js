import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { currentexam, HardRecord, CountStamp } from "../../Function/Exam";
import { Rerecord, Rerecordlist } from "../../Function/Reportlog";
import { useCookies } from 'react-cookie';
import "./ExamTestHard.css";
import "./ExamTestEasy.css";
import Swal from 'sweetalert2'
import Confirm from "../../Alert/Confirm";
import { Hardlog } from "../../Function/Person"
import { useNavigate } from "react-router-dom";
import { Easylog } from "../../Function/Person"

function ExamTestEasy() {
    const exam = useSelector((state) => ({ ...state }));
    const Exid = exam.examStore.exam.examid
    const UserID = exam.userStore.user.ObjectID
    const Username = exam.userStore.user.username
    const Catname = exam.examStore.exam.category
    const role = exam.userStore.user.role
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [exame, setExam] = useState([]);
    const [docount, setdocount] = useState([]);
    const Data = Object.values(data);


    const [log, setlog] = useState([]);
    const [log2, setlog2] = useState([]);
    const Log = Object.values(log);
    const Bog = Object.values(log2);


    const [counter, setCounter] = useState(59);
    const [min, setMin] = useState(89);

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

<<<<<<< HEAD
 console.log(Log.length)
=======
>>>>>>> 9799135a734fd7a271ecc4dc3bbcadd61b7bbb01
    useEffect(() => {
        //code
        if (localStorage.showresult === "true") {
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
        recordlist(Exid)
    }, [Exid, UserID]);


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
            setExam(res.data[0])
            setdocount(res.data[0].Docount)
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
                document.getElementById(index).disabled = true
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
        if (Selector === selectValueS.length) {
            let i = 0
            let d = 0
            while (i < isCorrect.length) {
                if (isCorrect[i].isCorrect === false) {
                    d = -1
                    console.log("False ", d)
                } else {
                    d += 1
                    console.log("True ", d)
                }
                i++
            }
            if (i === isCorrect.length && d === isCorrect.length) {
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
            ExamObjectid: Exid,
            Examname: exame.name,
            Title: exame.title,
            Category: Catname,
            Score: score
        }
        const payload2 = {
            Docount: parseInt(docount) + 1
        }
        const payload3 = {
            Docount: 1
        }
        if (docount == undefined) {
            CountStamp(Exid, payload3).then(res => {
                console.log(res.data)
            }).catch(err => {
                console.log(err);
            })
        } else {
            console.log("SSSSSSSSSSSSSSSSSSSSSSSSS")
            CountStamp(Exid, payload2).then(res => {
                console.log(res.data)
            }).catch(err => {
                console.log(err);
            })
        }
        HardRecord(Exid, payload)
            .then(res => {
                Confirm.fire({
                    title: 'ยืนยัน!!',
                    text: res.data,
                    icon: 'sucess',
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'Do it again',
                            text: 'Enjoy',
                            icon: 'success'
                        })
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
                    } else {
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
                        navigate("/user/extest")
                    }
                })
            }).catch(err => {
                console.log(err);
            })


    }
    function countdown() {

        if (counter === 0 && min !== 0) {
            setMin(min - 1);
            setCounter(59);
        } else {
            setCounter(counter - 1);
        }
        if (counter2 > 59) {
            setMin2(min2 + 1);
            setCounter2(0);
        } else {
            setCounter2(counter2 + 1);
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

        if (index === Choices.length) {
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

    function recordlist(authtoken) {
        Rerecordlist(authtoken).then((res) => {
            setlog2(res.data);
        });
    }

    const ShowReportQuestion = async (name, question) => {
        const { value: text } = await Swal.fire({
            title: name + " ข้อที่ " + question,
            input: 'textarea',
            inputLabel: 'รายงานปัญหา',
            inputPlaceholder: 'ปัญหาหรือข้อผิดพลาดที่พบ',
            confirmButtonText: 'ยืนยัน',
            confirmButtonColor: 'orange',
        })
        if (text) {
            const Reload = {
                Number: question,
                Name: name,
                Username: Username,
                Text: text,
            }
            Bog.push(Reload)
            Rerecord(Exid, Bog)
                .then(res => {
                    Swal.fire({
                        title: 'รายงานปัญหาสำเร็จ',
                        confirmButtonText: 'ยืนยัน',
                        confirmButtonColor: 'green',
                    })
                    loadData(Exid);
                    HardlogS(UserID);
                    recordlist(Exid)
                }).catch(err => {
                    console.log(err)
                })
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

                                <div className="result-card" style={{ textAlign: "center" }}>
                                    <br />
                                    <span className="ExamThardtext"> Your Score is {score} </span>
                                    <br />
                                    <span className="ExamThardtext"> ใช้เวลาไปทั้งหมด = {min2} นาที {counter2} วินาที </span>
                                    <br />
                                    <div>
                                        {RecordArray.map((item, index) =>
                                            <div key={index} className="result-Question">
                                                <div className="ExamThardQuestion">
                                                    {item.ANSiscorrect && item.selectValueS.length === item.CorrectANS.length ? (
                                                        <div className="result-q-True"><h2>Question: {index + 1}</h2></div>
                                                    ) : (
                                                        <div className="result-q-false"><h2>Question: {index + 1}</h2></div>
                                                    )
                                                    }
                                                    <br />
                                                    <center>
                                                        {item.images.map((pic, Ipic) =>
                                                            <img key={Ipic} src={pic.url} />
                                                        )}</center>
                                                    <br />
                                                    <span>{item.Question}</span>
                                                    <br />
                                                    <span>{`${item.selectValueS.length}/${item.CorrectANS.length} is Selected `}</span>
                                                </div>
                                                <br />
                                                <br />
                                                <div className="ExamThardtext">
                                                    <div className="ExamThardChoicepanel">
                                                        {item.ANSiscorrect && item.selectValueS.length === item.CorrectANS.length ? (
                                                            <div className="result-q-True">
                                                                <span>ข้อที่คุณตอบคือข้อที่</span> &nbsp;
                                                                {item.selectValueS.map((choose, iChoose) =>
                                                                    iChoose < item.selectValueS.length - 1
                                                                        ? <span key={iChoose}>{choose.index},</span>
                                                                        : <span key={iChoose}>{choose.index}</span>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <div className="result-q-false">
                                                                <span>ข้อที่คุณตอบคือข้อที่</span> &nbsp;
                                                                {item.selectValueS.map((choose, iChoose) =>
                                                                    iChoose < item.selectValueS.length - 1
                                                                        ? <span key={iChoose}>{choose.index},</span>
                                                                        : <span key={iChoose}>{choose.index}</span>
                                                                )}
                                                            </div>
                                                        )
                                                        }
                                                        <br />
                                                        {item.Choices.map((item2, idex) =>
                                                            <>
                                                                {item2.isCorrect
                                                                    ? (
                                                                        <button key={idex} id={idex + 1} className="ExamThardButton1true" disabled  >
                                                                            <div className="ExamThardtextarea">
                                                                                <div>
                                                                                    <div className="ExamThardnumpanel">
                                                                                        {idex + 1}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="ExamThardtextpanel">
                                                                                    {item2.text}
                                                                                </div>
                                                                            </div>
                                                                        </button>

                                                                    )
                                                                    : (
                                                                        <>
                                                                            {item.ANSiscorrect ?
                                                                                <button key={idex} id={idex + 1} name={idex + 1} className="ExamTeasyButton1" disabled  >
                                                                                    <div className="ExamTeasytextarea">
                                                                                        <div>
                                                                                            <div className="ExamTeasynumpanel">
                                                                                                {idex + 1}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="ExamTeasytextpanel">
                                                                                            {item2.text}
                                                                                        </div>
                                                                                    </div>
                                                                                </button>
                                                                                :
                                                                                <button key={idex} id={idex + 1} name={idex + 1} className="ExamTeasyButton1false" disabled  >
                                                                                    <div className="ExamTeasytextarea">
                                                                                        <div>
                                                                                            <div className="ExamTeasynumpanel">
                                                                                                {idex + 1}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="ExamTeasytextpanel">
                                                                                            {item2.text}
                                                                                        </div>
                                                                                    </div>
                                                                                </button>
                                                                            }
                                                                        </>
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
                                        <button className="ExamTeasyGobutton1" onClick={restartGame}>Submit to Record</button>
                                    </div>
                                </div>
                            )
                            :
                            (

                                <div className="ExamThardcards_wrap">
                                    <div className="ExamThardcard_item">
                                        <div className="ExamThardcard_inner">
                                            <div className="ExamThardrole_name">
                                                <h1>{exame.name} &nbsp;
                                                    Hard</h1>
                                                Time = {min}:{counter}
                                            </div>
                                            <br />
                                            {Data2.map((item, index) => (
                                                <div key={index}>

                                                    <div className="ExamThardQuestion">
                                                        <span style={{ fontWeight: "500" }}>Question: {currentQuestion + 1}</span>
                                                        <br />
                                                        <span>{item.Question}</span>
                                                        <br />
                                                        <button className="btn btn-warning" onClick={() => ShowReportQuestion(exame.name, currentQuestion + 1)}>รายงานปัญหา</button>
                                                    </div>
                                                    <center>
                                                        {item.images.map((pic, Ipic) =>
                                                            <img key={Ipic} src={pic.url} />
                                                        )}
                                                    </center>
                                                    <br />
                                                    <span>{`${Selector}/${item.CorrectANS.length} is Selected `}</span>
                                                    <div className="ExamThardtext">
                                                        <div className="ExamThardChoicepanel">
                                                            {item.Choices.map((item2, idex) =>
                                                                <>
                                                                    {Block
                                                                        ? (
                                                                            <button key={idex} id={idex + 1} className="ExamTeasyButton1" disabled  >
                                                                                <div className="ExamThardtextarea">
                                                                                    <div>
                                                                                        <div className="ExamThardnumpanel">
                                                                                            {idex + 1}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="ExamThardtextpanel">
                                                                                        {item2.text}
                                                                                    </div>
                                                                                </div>
                                                                            </button>
                                                                        )
                                                                        : (
                                                                            <button key={idex} id={idex + 1} className="ExamThardButton1" onClick={() => EasyselectCount(item2.isCorrect, item.CorrectANS, idex + 1)}  >
                                                                                <div className="ExamThardtextarea">
                                                                                    <div>
                                                                                        <div className="ExamThardnumpanel">
                                                                                            {idex + 1}
                                                                                        </div>
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
                                                    <center>
                                                        <button className="ExamThardGobutton1" onClick={() => gonext(item.Choices, item.Question, item.CorrectANS, item.Answerdetail, item.images)}>GONEXT</button>
                                                    </center>
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
