import React from 'react';
import { useState, useEffect } from 'react';
import { currentexam, listexam } from "../../Function/Exam";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { checkin } from "../../Store/examSilce";
import './Example.css';

const Example = () => {
    const exam = useSelector((state) => ({ ...state }));
    const user = useSelector((state) => ({ ...state }))
    const [exame, setExam] = useState([]);
    const [category, setCategory] = useState([]);
    const Exid = exam.examStore.exam.examid
    const UserID = exam.userStore.user.ObjectID
    const role = user.userStore.user.role
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [Block, setBlock] = useState(false)

    const [data, setData] = useState([]);
    const Data = Object.values(data);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const Data2 = Data.slice(currentQuestion, currentQuestion + 1);

    useEffect(() => {
        //code
        loadData(Exid);
    }, [Exid, UserID]);

    useEffect(() => {
        //code
        setCurrentQuestion(parseInt(localStorage.currentQuestion))
    }, []);

    function loadData(authtoken) {
        currentexam(authtoken).then((res) => {
            setExam(res.data[0])
            setData(res.data[0].exdata)
            setCategory(res.data[0].CAT)
        }).catch(err => {
            console.log(err.response.data)
        })
    }

    function SeeExam(id, catid, category) {
        // if (role) {
            if (role === "admin") {
                navigate("/admin/home")
            } else {
                const EXAM = {
                    examid: id,
                    catid: catid,
                    category: category
                }
                dispatch(checkin(EXAM))
                localStorage.setItem('examid', id)
                localStorage.setItem('catid', catid)
                navigate("/user/extest")
            }
        // } else {
        //     Swal.fire({
        //         position: 'top',
        //         title: 'Error!',
        //         text: "กรุณา Login",
        //         icon: 'error',
        //         iconColor: 'Red',
        //         confirmButtonColor: '#3085d6',
        //         confirmButtonText: 'ตกลง'
        //     })
        //     navigate("/login")
        // }
    }

    function gonext() {
        setBlock(true)
        localStorage.setItem("currentQuestion", currentQuestion + 1)
        setCurrentQuestion(preve => preve + 1);
    }

    function goback() {
        setBlock(true)
        localStorage.setItem("currentQuestion", currentQuestion - 1)
        setCurrentQuestion(preve => preve - 1);
    }


    return (
        <div className='example-container'>
            <center><h1>{exame.name}</h1></center>
            <div className='example-card'>
                {Data2.map((item, index) => (
                    <div key={index}>
                        <div className="ExamTeasyQuestion">
                            <span style={{ fontWeight: "500" }}>Question: {currentQuestion + 1}</span>
                            <br />
                            <span>{item.Question}</span>
                            <br />
                        </div>
                        <center>{item.images.map((pic, Ipic) =>
                            <img key={Ipic} src={pic.url} />
                        )}</center>
                        <br />
                        <div className="ExamTeasytext">
                            <div className="ExamTeasyChoicepanel">
                                {item.Choices.map((item2, idex) =>
                                    <>
                                        {Block
                                            ? (
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
                                            )
                                            : (
                                                <button key={idex} id={idex + 1} name={idex + 1} className="ExamTeasyButton1" >
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
                        </div>
                        <center>
                            {currentQuestion === 0 ? <div></div> :
                                <button className='btn btn-secondary' onClick={() => goback()}>PREVIOUS</button>
                            }
                            &nbsp;
                            {currentQuestion === Data.length - 1 ? <div></div> :
                                <button className="btn btn-primary" onClick={() => gonext()}>NEXT</button>
                            }

                        </center>
                    </div>
                ))}

            </div>
            {category.map((cat, ic) =>
                <div key={ic}>
                    <center><button className="btn btn-primary" onClick={() => SeeExam(exame._id, exame.Categoryid, cat.name)}>Back to Exam page</button></center>
                </div>
            )}
        </div>
    )
}

export default Example
