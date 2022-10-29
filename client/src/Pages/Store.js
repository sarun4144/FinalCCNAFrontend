import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listexam } from "../Function/Exam";
import { listCategory } from "../Function/Category";
import { checkin } from "../Store/examSilce";
import { checkout } from "../Store/examSilce";
import './Store.css';
import Dropdown from 'react-bootstrap/Dropdown';
//Notify

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function Store() {
  const navigate = useNavigate();
  const user = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()
  const [exame, setData] = useState([]);
  const Token = user.userStore.user.token
  const [category, setCat] = useState([]);
  const [select, setSelect] = useState("");

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
    listCategory(authtoken).then(res => {
      /*console.log(res.data)*/
      setCat(res.data)
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

  const [catText, setDropDownText] = useState("Select Category");

  const filterExamList = exame.filter((exam) => {
    if(select === ""){
      return exam;
    }else{
      return exam.Categoryid === select;
    }
  })

  try {
    if (user.userStore.user.role === 'admin') {
      return (
        <div className='store-container'>
          <div className="cat-search-container">
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-cat">
                {catText}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {category.map((item) =>
                  <Dropdown.Item as="button" onClick={(id) => { setSelect(item._id); setDropDownText(item.name) }}>{item.name}</Dropdown.Item>
                )}
                <Dropdown.Item as="button" onClick={(id) => { setSelect(""); setDropDownText("ALL") }}>ALL</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {console.log(select)}
            {console.log(catText)}
            {console.log(exame)}
          </div>
          {filterExamList.map((item) =>
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
        <div className="cat-search-container">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-cat">
            {catText}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {category.map((item) =>
                <Dropdown.Item as="button" onClick={(id) => { setSelect(item._id); setDropDownText(item.name) }}>{item.name}</Dropdown.Item>
              )}
              <Dropdown.Item as="button" onClick={(id) => { setSelect(""); setDropDownText("ALL") }}>ALL</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {console.log(select)}
          {console.log(catText)}
        </div>
        {filterExamList.map((item) =>
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
      <div className="cat-search-container">
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-cat">
          {catText}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {category.map((item) =>
              <Dropdown.Item as="button" onClick={(id) => { setSelect(item._id); setDropDownText(item.name) }}>{item.name}</Dropdown.Item>
            )}
            <Dropdown.Item as="button" onClick={(id) => { setSelect(""); setDropDownText("ALL") }}>ALL</Dropdown.Item>
          </Dropdown.Menu>

        </Dropdown>

      </div>
      {filterExamList.map((item) =>
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