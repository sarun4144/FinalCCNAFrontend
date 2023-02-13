import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ComponentCSS/Content.css"
import { listexamSort, listexamSortDate } from "../Function/Exam"
import { reads } from "../Function/Person"
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { checkin } from "../Store/examSilce";


function Content() {
    const navigate = useNavigate();
    const user = useSelector((state) => ({ ...state }))
    const role = user.userStore.user.role
    const [dataMost, setDataMost] = useState([]);
    const [dataNew, setDataNew] = useState([]);
    const dispatch = useDispatch()
    

    console.log(dataMost)
    console.log(dataNew)
    useEffect(() => {
        //code
        loadData();
        // reads()

    }, []);

    const loadData = () => {
        listexamSort().then(res => {
            setDataMost(res.data)
        }).catch(err => {
            console.log(err.response.data)
        })
        listexamSortDate().then(res => {
            setDataNew(res.data)
        }).catch(err => {
            console.log(err.response.data)
        })

    }

    function SeeExam(id, catid, category) {
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
      }

    return (
        <div className='mainBackground'>
            <div className='content-container'>

                <div className="content-con">
                    <div className="content-con-header"><h1>The Most Popular Exam</h1></div>
                    <div className="content-row">
                        {dataMost.slice(0, 3).map((itemM, indexM) =>
                            <div className="content-card">
                                <div className="content-con-header">
                                    <h2>
                                        {indexM + 1} ) {itemM.name}
                                    </h2>
                                </div>
                                <div className="content-Text">

                                    <p>
                                        {itemM.title}
                                    </p>
                                    submitted : { itemM.Docount >= 0 ? <>{itemM.Docount}</> : <>0</> }
                                </div>
                                <hr />
                                <div>{itemM.CAT.map((cat) =>
                                    <button className="btn btn-primary" onClick={() => SeeExam(itemM._id, itemM.Categoryid, cat.name)}>
                                        Enter
                                    </button>)}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
                <br></br>
                <div className="content-con">
                    <div className="content-con-header"><h1>The Newest Exam</h1></div>
                    <div className="content-row">
                        {dataNew.slice(0, 3).map((itemN, indexN) =>
                            <div className="content-card">
                                <div className="content-con-header">
                                    <h2>
                                        {indexN + 1}  {itemN.name}
                                    </h2>
                                </div>
                                <div className="content-Text">

                                    <p>
                                        {itemN.title}
                                    </p>
                                    {itemN.date.substring(0, 10)}
                                </div>
                                <hr />
                                <div>{itemN.CAT.map((cat) =>
                                    <button className="btn btn-primary" onClick={() => SeeExam(itemN._id, itemN.Categoryid, cat.name)}>
                                        Enter
                                    </button>)}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Content