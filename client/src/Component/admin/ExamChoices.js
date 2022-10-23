import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { currentexam, examchoicesadd, examChoiceschange, examChoicesdelete, examReset, examHeadChange } from "../../Function/Exam"
import { listCategory } from "../../Function/Category";
import Toast from "../../Alert/Success";
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import Confirm from "../../Alert/Confirm";
import Swal from 'sweetalert2';
import './ExamChoices.css'

import FileUpload from "./FileUpload";
function ExamChoices() {
  const [data, setData] = useState([]);
  const [cat, setCat] = useState([]);
  const [Head, setHead] = useState([]);
  const Data = Object.values(data);
  const [isDisabled, setIsDisabled] = useState(true);
  const [value, setValue] = useState({})
  const [value2, setValue2] = useState({
    Question: null
  })
  const [value3, setValue3] = useState({

  })
  const store = useSelector((state) => ({ ...state }))
  const EXid = store.examStore.exam.examid
  const Catname = store.examStore.exam.category
  const Catid = store.examStore.exam.catid

  useEffect(() => {
    loadData(EXid)

  }, [EXid])

  function loadData(id) {
    currentexam(id).then((res) => {
      setData(res.data[0].exdata)
      setHead(res.data[0])
      listCategory().then((res) => {
        setCat(res.data)
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    })
  }
  function AddExam(num) {
    const Num = {
      Num: num
    }
    console.log(num)
    examchoicesadd(EXid, Num)
      .then(res => {
        Toast.fire({
          position: 'top-end',
          icon: 'success',
          title: res.data
        })
        loadData(EXid)
      }).catch(err => {
        console.log(err);
      })
  }
  function reSet(exam) {
    const NewData = {}
    var i = 0;
    var res = Object.keys(exam)
    try {
      while (i < res.length) {
        NewData[`${i + 1}`] = exam[`${res[i]}`];
        delete exam[`${res[i]}`];
        i++;
      }
      examReset(EXid, NewData)
        .then(res => {
          Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data
          })
          loadData(EXid)
        }).catch(err => {
          console.log(err);
        })
    } catch {
      console.log("ERROR")
    }


  }

  function Delete(index) {
    const Num = {
      Num: index
    }
    console.log(index)
    Confirm.fire({
      title: 'ยืนยัน!!',
      text: "คุณต้องการจะลบ คำถาม ใช่หรือไม่",
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'ลบ คำถาม สำเร็จ!',
          text: 'คำถาม ได้ถูกลบแล้ว',
          icon: 'success'
        })
        examChoicesdelete(EXid, Num)
          .then(res => {
            setIsDisabled(true)
            reSet(res.data.exdata)
            loadData(EXid)
          }).catch(err => {
            console.log(err);
          })
      }
    })
  }


  const handleChange = () => {
    setIsDisabled(!isDisabled)
  };
  const handleChangeQ = (e) => {
    setValue2({
      ...value2, [e.target.name]: e.target.value,
    })
  };
  const handleChangeC = (e) => {
    setValue({
      ...value, [e.target.name]: e.target.value,
    })
  };
  const handleChangeh = (e) => {
    setValue3({
      ...value3, [e.target.name]: e.target.value,
    })
  };


  const Edit = async (Questions, Choices, index) => {

    const Values = {
      Question: "",
      Choices: [],
    }
    const payload = {
      Question: "",
      Choices: [],
      Num: index
    }
    //const result = Object.values(value);
    Values.Question = Questions
    Values.Choices = Choices
    /*
    console.log("value2", value2.Question)
    console.log("value", value)
    console.log("result", result)
    console.log("Values", Values)
    */
    try {
      if (value2.Question == null) {
        payload.Question = Values.Question
        console.log("payload", payload)
      } else {
        payload.Question = value2.Question
        console.log("payload", payload)
      }
      let i = 0
      while (i < Values.Choices.length) {
        if (value[i] !== " " && value[i] !== undefined) {
          payload.Choices[i] = value[i]
        } else {
          payload.Choices[i] = Values.Choices[i]
        }
        i++
      }
      if (i = Values.Choices) {
        examChoiceschange(EXid, payload)
          .then(res => {
            Toast.fire({
              position: 'top-end',
              icon: 'success',
              title: res.data
            })
            loadData(EXid)
          }).catch(err => {
            console.log(err);
          })
      }

    } catch (err) {

    }

  };

  function selectAdd(Questions2, Choices2, index2) {
    let d = Choices2.length
    Choices2[d] = " "
    console.log(Choices2)
    Edit(Questions2, Choices2, index2)
  }
  function selectDelete(Questions3, Choices3, index3, numI) {
    let i = 0;
    var Choice = []
    try {
      while (i < Choices3.length) {
        if (i !== numI) {
          Choice.push(Choices3[i])
          i++;
        } else {
          i++;
        }
      }

    } catch (err) {

    }
    Edit(Questions3, Choice, index3)
  }
  function EditH() {
    const payload = {
      QuestionName: Head.name,
      title: Head.title,
      Categoryid: Catid
    }
    try {
      if (value3.QuestionName) {
        payload.QuestionName = value3.QuestionName
      }
      if (value3.title) {
        payload.title = value3.title
      }
      if (value3.Categoryid) {
        payload.Categoryid = value3.Categoryid
      }
      examHeadChange(EXid, payload)
        .then(res => {
          Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data
          })
          localStorage.setItem('catid', value3.Categoryid)
          loadData(EXid)

        }).catch(err => {
          console.log(err);
        })
    } catch (err) {

    }


  }
  return (
    <div className="container" >
      <div className="sticky-top" >
        <div className="form-check">
          <input onChange={() => handleChange()} className="form-check-input" type="checkbox" />
          <label className="form-check-label" >
            แก้ไขข้อสอบ
          </label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={() => AddExam(Data.length + 1)}>Addexam</button>
      </div>
      <div className="card" >
        <h4> QuestionName : {Head.name}</h4>
        <textarea name="QuestionName" className="form-control" onChange={handleChangeh} defaultValue={Head.name}>{Head.name}</textarea>
        <h4> Title : {Head.title}</h4>
        <textarea name="Title" className="form-control" onChange={handleChangeh} defaultValue={Head.title}></textarea>
        <div className="form-group">
          <h4 htmlFor="exampleFormControlSelect1">Category :{Catname}</h4>
          <select className="form-control" id="exampleFormControlSelect1" name="Categoryid" onChange={handleChangeh}>
            <option selected value={Catid} >{Catname}</option>
            {cat.map((item, index) =>
              <option key={index} value={item._id}>{item.name}</option>

            )}
          </select>
          <br />
          <button className="btn btn-secondary" onClick={() => EditH()}><AiFillEdit /></button>
        </div>

      </div>
      {Data.map((item, index) =>
        <div className="card" >

          <fieldset disabled={isDisabled}>
            <div className="form-group">
              <h5> QuestionNumber: {index + 1}</h5>
              <textarea key={index} name="Question" className="form-control" onChange={handleChangeQ} rows="3">{item.Question}</textarea>
              <div className="form-group">
              </div>
              <br />
              <FileUpload />
              <br />
              <button type="button" className="btn btn-primary" onClick={(Questions2) => selectAdd(item.Question, item.Choices, index + 1)}>  เพิ่มช้อย<AiOutlinePlus /></button>
              {item.Choices.map((num, numI) =>
                <div className="form-group">
                  <table className="table">
                    <thead>
                      <tr>
                        <td> <label>{numI + 1}</label></td>
                        <td> <textarea key={num} name={numI} className="form-control" rows="1" defaultValue={num} onChange={handleChangeC} ></textarea></td>
                        <td>
                          <button type="button" className="btn btn-danger" onClick={(Questions2) => selectDelete(item.Question, item.Choices, index + 1, numI)}> <AiFillDelete /> </button>
                        </td>
                      </tr>
                    </thead>
                  </table>
                </div>
              )}
              <button className="btn btn-secondary" onClick={(Question) => Edit(item.Question, item.Choices, index + 1)}><AiFillEdit /></button>
              <button className="btn btn-danger" onClick={() => Delete(index + 1)}><AiFillDelete /> </button>
            </div>
          </fieldset>
        </div>

      )}

    </div>
  )
}

export default ExamChoices