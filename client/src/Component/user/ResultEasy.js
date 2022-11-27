import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { EasylogS } from "../../Function/Person"


function ResultEasy() {
    const navigate = useNavigate();
    const user = useSelector((state) => ({ ...state }))
    const Userid = user.userStore.user.ObjectID
    const [dataExamEasy, setDataExamEasy] = useState([]);
    const [score, setScore] = useState([]);
    const [examName, setExamName] = useState([]);
    const [date, setDate] = useState("");


    const DataHard = Object.values(dataExamEasy);

    console.log(dataExamEasy)
    useEffect(() => {
        loadExamData(Userid)

    }, [Userid])

    function loadExamData(id) {
        const payload = {
            Index: localStorage.Index
        }
        EasylogS(id, payload).then((res) => {
            setDataExamEasy(res.data.Exam);
            setScore(res.data.Score);
            setExamName(res.data.Examname);
            setDate(res.data.Date);
        });
    }



    return (
        <div className="result-card" style={{ textAlign: "center" }}>
            <br />
            <h1>{examName} Easy</h1>
            <h2>{date.substring(0, 15)}</h2>
            <hr />
            <span className="ExamTeasytext"><center><h1> Your Score is {score} </h1></center></span>
            <br />
            <div >
                {dataExamEasy.map((item, index) =>
                    <div key={index} className="result-Question">

                        <div className="ExamTeasyQuestion">
                            {item.ANSiscorrect && item.selectValueS.length == item.CorrectANS.length ? (
                                <div className="result-q-True"><h2>Question: {index + 1}</h2></div>
                            ) : (
                                <div className="result-q-false"><h2>Question: {index + 1}</h2></div>
                            )
                            }
                            <br />
                            <center>{item.images.map((pic, Ipic) =>
                                <img key={Ipic} src={pic.url} />
                            )}</center>
                            <br />
                            <span>{item.Question}</span>
                            <br />
                            <span>{`${item.selectValueS.length}/${item.CorrectANS.length} is Selected `}</span>
                        </div>
                        <br />
                        <br />
                        <div className="ExamTeasytext">
                            <div className="ExamTeasyChoicepanel">
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
                                                <button key={idex} id={idex + 1} name={idex + 1} className="ExamTeasyButton1true" disabled  >
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
                                    ? (<div className="result-detail">
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
    )
}

export default ResultEasy