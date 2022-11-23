import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { HardlogS } from "../../Function/Person"
import { Link, useNavigate } from "react-router-dom";


function ResultHard() {
    const user = useSelector((state) => ({ ...state }))
    const navigate = useNavigate();
    const Userid = user.userStore.user.ObjectID
    const [dataExamHard, setDataExamHard] = useState([]);
    const [score, setScore] = useState([]);
    const [time, setTime] = useState([]);
    const [examName, setExamName] = useState([]);
    const [date, setDate] = useState("");


    const DataHard = Object.values(dataExamHard);

    console.log(dataExamHard)
    useEffect(() => {
        loadExamData(Userid)

    }, [Userid])

    function loadExamData(id) {
        const payload = {
            Index: localStorage.Index
        }
        HardlogS(id, payload).then((res) => {
            setDataExamHard(res.data.Exam);
            setScore(res.data.Score);
            setTime(res.data.Time);
            setExamName(res.data.Examname);
            setDate(res.data.Date);
        });
    }



    return (
        <div className="ExamThardtext">
            <div className="result-card" style={{ textAlign: "center" }}>
                <h1>{examName} Hard</h1>
                <h2>{date.substring(0, 15)}</h2>
                <hr />
                <span className="ExamThardtext"> Your Score is {score} </span>
                <br />
                <span className="ExamThardtext"> ใช้เวลาไปทั้งหมด = {time} </span>
                <br />
                <div>
                    {dataExamHard.map((item, index) =>
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
                </div>
               <button onClick={() => navigate("/user/profile")}  className="btn btn-primary">back to Profile</button> 
            </div>
        </div>
    )
}

export default ResultHard