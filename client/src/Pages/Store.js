import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listexam } from "../Function/Exam"
import { checkin } from "../Store/examSilce"
import { checkout } from "../Store/examSilce";
import './Store.css'
import CatSearch from "../Component/CatSearch";
//Notify

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function Store() {
  const navigate = useNavigate();
  const user = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()
  const [exame, setData] = useState([]);
  const Token = user.userStore.user.token

  useEffect(() => {
    //code
    dispatch(checkout(null))
    loadData(Token)
  }, [Token, dispatch]);
  const loadData = (authtoken) => {
    listexam(authtoken).then(res => {
      setData(res.data)
    }).catch(err => {
      console.log(err.response.data)
    })
  }

  function EditBTN(id, catid, category) {
    const EXAM = {
      examid: id,
      catid: catid,
      category: category
    }
    dispatch(checkin(EXAM))
    localStorage.setItem('examid', id)
    localStorage.setItem('catid', catid)
    navigate("/admin/examchoices");
  }
  function SeeExam(id) {
    navigate("/admin/home");
  }

  try {
    if (user.userStore.user.role === 'admin') {
      return (
        <div className='store-container'>
          <div className="cat-search-container"><CatSearch/></div>
          {exame.map((item) =>
            <div className='card'>
              {item.CAT.map((cat) =>
                <div >
                  <div className="form-group">
                    <h1 form="exampleFormControlInput1" >{item.name}</h1>
                  </div>
                  <div className="form-group">
                    <h4 form="exampleFormControlInput1" >{item.title}</h4>
                  </div>
                  <div className="form-group">
                    <h5 form="exampleFormControlInput1" >Category : {cat.name}</h5>
                  </div>

                  <button type="submit" className="btn btn-primary" onClick={() => SeeExam(item._id)}>ดูข้อสอบ</button>
                  <button type="submit" className="btn btn-danger" onClick={(id) => EditBTN(item._id, item.Categoryid, cat.name)}>แก้ไข</button>
                </div>
              )}
            </div>
          )}
        </div>

      )
    }
    return (
      <div className='store-container'>
        <div className="cat-search-container"><CatSearch/></div>
        {exame.map((item) =>
          <div className='card'>
            <form >
              <div className="form-group">
                <h1 form="exampleFormControlInput1" >{item.name}</h1>
              </div>
              <div className="form-group">
                <h4 form="exampleFormControlInput1" >{item.title}</h4>
              </div>
              {item.CAT.map((cat) =>
                <div className="form-group">
                  <h5 form="exampleFormControlInput1" >Category : {cat.name}</h5>
                </div>
              )}
              <button type="submit" className="btn btn-primary">ดูข้อสอบ</button>
            </form>
          </div>
        )}
      </div>

    )
  } catch (error) {
    <div className='container'>
      <div className="cat-search-container"><CatSearch/></div>
      {exame.map((item) =>
        <div className='card'>
          <form >
            <div className="form-group">
              <h1 form="exampleFormControlInput1" >{item.name}</h1>
            </div>
            <div className="form-group">
              <h4 form="exampleFormControlInput1" >{item.title}</h4>
            </div>
            {item.CAT.map((cat) =>
              <div className="form-group">
                <h5 form="exampleFormControlInput1" >Category : {cat.name}</h5>
              </div>
            )}
            <button type="submit" className="btn btn-primary">ดูข้อสอบ</button>
          </form>
        </div>
      )}
    </div>

  }
}


export default Store