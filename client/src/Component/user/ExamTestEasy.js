import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { currentexam, EasyRecord, CountStamp } from "../../Function/Exam";
import { Rerecord, Rerecordlist } from "../../Function/Reportlog";
import { useCookies } from 'react-cookie';
import "./ExamTestEasy.css";
import Swal from 'sweetalert2'
import Confirm from "../../Alert/Confirm";
import { Easylog } from "../../Function/Person"
import { useNavigate } from "react-router-dom";

function ExamTestEasy() {
  const exam = useSelector((state) => ({ ...state }));
  const Exid = exam.examStore.exam.examid
  const UserID = exam.userStore.user.ObjectID
  const Username = exam.userStore.user.username
  const Catname = exam.examStore.exam.category
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
  const [min, setMin] = useState(59);

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

  // console.log(log2.length)
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
    EasylogS(UserID);
    recordlist(Exid)
  }, [Exid, UserID]);


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

  function EasylogS(authtoken) {
    Easylog(authtoken).then((res) => {
      setlog(res.data);
    });
  }
  function recordlist(authtoken) {
    Rerecordlist(authtoken).then((res) => {
      setlog2(res.data);
    });
  }
  //easyFunction
  function EasyselectCount(isCorrect, CorrectANS, index) {
    document.getElementById(index).className = "ExamTeasyButton1selected"
    setselectValue({
      ...selectValue, [`${99 - index}`]: { isCorrect: isCorrect, index: index }
    })
    setANSCount(CorrectANS.length)
    setSelector(preve => preve + 1)

  }

  const optionClicked = (isCorrect) => {
    // Increment the score
    if (Selector === selectValueS.length) {
      let i = 0
      let d = 0
      while (i < isCorrect.length) {
        if (isCorrect[i].isCorrect === false) {
          document.getElementById(isCorrect[i].index).className = "ExamTeasyButton1false "
          d = -1
          console.log("False ", d)
        } else {
          d += 1
          document.getElementById(isCorrect[i].index).className = "ExamTeasyButton1true"
          console.log("True ", d)
        }
        i++
      }
      if (i === isCorrect.length && d === isCorrect.length) {
        setAnswerdetail(true)
        console.log("true")
        setANSiscorrect(true)

      } else {
        console.log("false")
        setAnswerdetail(true)
        setANSiscorrect(false)
      }
    } else {
      console.log("falseNA")
      if (currentQuestion < Data.length) {
        document.getElementById(isCorrect[0].index).className = "ExamTeasyButton1false "
      }
    }
  }

  const restartGame = () => {
    const payload = {
      Easy: RecordArray,
      UserID: UserID,
      Type: localStorage.TypeTest,
      Num: Log.length + 1,
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
    if (docount === undefined) {
      CountStamp(Exid, payload3).then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log(err);
      })
    } else {
      CountStamp(Exid, payload2).then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log(err);
      })
    }
    EasyRecord(Exid, payload)
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
      document.getElementById(index + 1).className = "ExamTeasyButton1"
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
          EasylogS(UserID);
          recordlist(Exid)
        }).catch(err => {
          console.log(err)
        })
    }
  }


  return (
    <>
      {
        showResults
          ? (
            <div className="result-card" style={{ textAlign: "center" }}>

              <br />
              <span className="ExamTeasytext"><center><h1> Your Score is {score} / {RecordArray.length} </h1></center></span>
              <br />
              <div >
                {RecordArray.map((item, index) =>
                  <div key={index} className="result-Question">

                    <div className="ExamTeasyQuestion">
                      {item.ANSiscorrect && item.selectValueS.length === item.CorrectANS.length ? (
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
              <button className="ExamTeasyGobutton1" onClick={restartGame}>Submit to Record</button>
            </div>

          )
          :
          <div className="ExamTeasycards_wrap">
            <div className="ExamTeasycard_item">
              <div className="ExamTeasycard_inner">
                <div className="ExamTeasyrole_name">
                  <h1>{exame.name} Easy</h1>
                </div>
                {Data2.map((item, index) => (
                  <div key={index}>
                    <div className="ExamTeasyQuestion">
                      <span style={{ fontWeight: "500" }}>Question: {currentQuestion + 1}</span>
                      <br />
                      <span>{item.Question}</span>
                      <br />
                      <button className="btn btn-warning" onClick={() => ShowReportQuestion(exame.name, currentQuestion + 1)}>รายงานปัญหา</button>
                    </div>
                    <center>
                      {item.images.map((pic, Ipic) =>
                        <img key={Ipic} src={pic.url} />
                      )}</center>
                    <br />
                    <span>{`${Selector}/${item.CorrectANS.length} is Selected `}</span>
                    <div className="ExamTeasytext">
                      <div className="ExamTeasyChoicepanel">
                        {item.Choices.map((item2, idex) =>
                          <>
                            {Block
                              ? (
                                <button key={idex} id={idex + 1} name={idex + 1} className="ExamTeasyButton1" onClick={() => EasyselectCount(item2.isCorrect, item.CorrectANS, idex + 1)} disabled  >
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
                                <button key={idex} id={idex + 1} name={idex + 1} className="ExamTeasyButton1" onClick={() => EasyselectCount(item2.isCorrect, item.CorrectANS, idex + 1)}  >
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
                      <button className="ExamTeasyGobutton1" onClick={() => gonext(item.Choices, item.Question, item.CorrectANS, item.Answerdetail, item.images)}>GONEXT</button>
                    </center>
                  </div>

                ))}
              </div>
            </div>
          </div>
      }
    </>
  )

}
export default ExamTestEasy;
