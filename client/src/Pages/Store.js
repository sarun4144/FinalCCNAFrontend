import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listexam,removeExam} from "../Function/Exam";
import { listCategory } from "../Function/Category";
import { checkin } from "../Store/examSilce";
import { checkout } from "../Store/examSilce";
import './Store.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Swal from 'sweetalert2'
import Confirm from "../Alert/Confirm"

//Notify

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function Store() {
  const navigate = useNavigate();
  const user = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()
  const [exame, setData] = useState([]);
  const Token = user.userStore.user.token
  const role = user.userStore.user.role
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
  function DeleteBTN(id) {

    Confirm.fire({
      title: 'ยืนยัน!!',
      text: "คุณต้องการจะลบ User ใช่หรืไม่",
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
      
        removeExam(id).then((res) => {
          console.log("Delete", res);
          Swal.fire({
            title: 'ลบ Exam สำเร็จ!',
            text: 'Exam ได้ถูกลบแล้ว',
            icon: 'success'
          })
          loadData(Token)
        }).catch((err) => {
          console.log(err.response);
        });
      }
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
    //   Swal.fire({
    //     position: 'top',
    //     title: 'Error!',
    //     text: "กรุณา Login",
    //     icon: 'error',
    //     iconColor: 'Red',
    //     confirmButtonColor: '#3085d6',
    //     confirmButtonText: 'ตกลง'
    //   })
    //   navigate("/login")
    // }
  }
  const [catText, setDropDownText] = useState("Select Category");
  const filterExamList = exame.filter((exam) => {
    if (select === "") {
      return exam;
    } else {
      return exam.Categoryid === select;
    }
  })

  try {
    if (user.userStore.user.role === 'admin') {
      return (
        <div className='store-container'>
          <div className="store-header">Exam List</div>
          <div className="cat-search-container">
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-cat">
                {catText}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {category.map((item, catindex) =>
                  <Dropdown.Item key={catindex} as="button" onClick={(id) => { setSelect(item._id); setDropDownText(item.name) }}>{item.name}</Dropdown.Item>
                )}
                <Dropdown.Item as="button" onClick={(id) => { setSelect(""); setDropDownText("ALL") }}>ALL</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {console.log(select)}
            {console.log(catText)}
            {console.log(exame)}
          </div>
          {filterExamList.map((item, i) =>
            <div key={i} className='store-card'>
              <div >
                <div className="form-group">
                  <div className="store-card-header"><h1>{item.name}</h1></div>
                </div>
                <div className="form-group">
                  <h4>{item.title}</h4>
                </div>
              </div>
              {item.CAT.map((cat, index) =>
                <div key={index}>
                  <div className="form-group">
                    <h5>Category : {cat.name}</h5>
                  </div>
                  <div className="form-group">
                    <h5>Creat at : {item.date}</h5>
                  </div>
                  <button type="submit" className="btn btn-warning" onClick={(id) => EditBTN(item._id, item.Categoryid, cat.name)}>Edit</button> &nbsp;
                  <button type="submit" className="btn btn-danger" onClick={(id) => DeleteBTN(item._id)}>Delete</button>
                </div>
              )}
            </div>
          )}
        </div>
      )
    }
    return (
      <div className='store-container'>
        <div className="store-header">Exam List</div>
        <div className="cat-search-container">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-cat">
              {catText}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {category.map((item, catindex) =>
                <Dropdown.Item key={catindex} as="button" onClick={(id) => { setSelect(item._id); setDropDownText(item.name) }}>{item.name}</Dropdown.Item>
              )}
              <Dropdown.Item as="button" onClick={(id) => { setSelect(""); setDropDownText("ALL") }}>ALL</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {console.log(select)}
          {console.log(catText)}
        </div>
        {filterExamList.map((item, i) =>
          <div key={i} className='store-card'>
            <form >
              <div className="form-group">
              <div className="store-card-header"><h1>{item.name}</h1></div>
              </div>
              <div className="form-group">
                <h4>{item.title}</h4>
              </div>
              {item.CAT.map((cat, index) =>
                <div key={index}>
                  <div className="form-group">
                    <h5>Category : {cat.name}</h5>
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={() => SeeExam(item._id, item.Categoryid, cat.name)}>Enter</button>
                </div>
              )}
            </form>
          </div>
        )}
      </div>

    )
  } catch (error) {
    <div className='store-container'>
      <div className="store-header">Exam List</div>
      <div className="cat-search-container">
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-cat">
            {catText}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {category.map((item, catindex) =>
              <Dropdown.Item key={catindex} as="button" onClick={(id) => { setSelect(item._id); setDropDownText(item.name) }}>{item.name}</Dropdown.Item>
            )}
            <Dropdown.Item as="button" onClick={(id) => { setSelect(""); setDropDownText("ALL") }}>ALL</Dropdown.Item>
          </Dropdown.Menu>

        </Dropdown>

      </div>
      {filterExamList.map((item, i) =>
        <div key={i} className='store-card'>
          <form >
            <div className="form-group">
            <div className="store-card-header"><h1>{item.name}</h1></div>
            </div>
            <div className="form-group">
              <h4>{item.title}</h4>
            </div>
            {item.CAT.map((cat, index) =>
              <div key={index}>
                <div className="form-group">
                  <h5>Category : {cat.name}</h5>
                </div>
                <button type="submit" className="btn btn-primary" onClick={() => SeeExam(item._id, item.Categoryid, cat.name)}>Enter</button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>

  }
}


export default Store