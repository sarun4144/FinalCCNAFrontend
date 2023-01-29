import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { currentexam, examchoicesadd, examChoiceschange, examChoicesdelete, examReset, examHeadChange, CorrectAnswer } from "../../Function/Exam"
import { listCategory } from "../../Function/Category";
import { Imageadd, Imageremove } from "../../Function/CloudDinary";

import Toast from "../../Alert/Success";
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import Confirm from "../../Alert/Confirm";
import Swal from 'sweetalert2';
import './ExamChoices.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUpload from "./FileUpload";
import { BsXLg } from "react-icons/bs";
import axios from "axios";

function ExamChoices() {
  const [data, setData] = useState([]);

  const [cat, setCat] = useState([]);
  const [Head, setHead] = useState([]);
  const [loading, setLoad] = useState(false);
  const Data = Object.values(data);
  const [isDisabled, setIsDisabled] = useState(true);
  const [value, setValue] = useState({})
  const [value2, setValue2] = useState({
    Question: null,
  })
  const [value3, setValue3] = useState({

  })
  const [value4, setValue4] = useState({
    images: []
  })
  const store = useSelector((state) => ({ ...state }))
  const EXid = store.examStore.exam.examid
  const Catname = store.examStore.exam.category
  const Catid = store.examStore.exam.catid

  console.log(Data)
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
      ...value, [e.target.name]: { text: e.target.value, isCorrect: false },
    })
  };
  const handleChangeh = (e) => {
    setValue3({
      ...value3, [e.target.name]: e.target.value,
    })
  };


  const Edit = (Questions, Choices, index, Images, Answerdetail, CorrectANS) => {

    const Values = {
      Question: "",
      Choices: [],
    }
    const payload = {
      Question: "",
      images: [],
      Answerdetail: "",
      Choices: [],
      CorrectANS: CorrectANS,
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
    console.log("valueC", Values.Choices)
    console.log("payload", payload.Choices)
    console.log("value", value)

    try {
      if (!CorrectANS) {
        payload.CorrectANS = []
      }
      if (!value2.Answerdetail) {
        payload.Answerdetail = Answerdetail
      } else {
        payload.Answerdetail = value2.Answerdetail
      }
      if (Images.length > 0) {
        payload.images = Images
      }
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
          value[i].isCorrect = Values.Choices[i].isCorrect
          payload.Choices[i] = value[i]
          console.log(value[i])
        } else {
          payload.Choices[i] = Values.Choices[i]
          console.log("F")
        }
        i++
      }
      console.log(payload)
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

  function selectAdd(Questions2, Choices2, index2, images, Answerdetail, CorrectANS) {
    let d = Choices2.length
    Choices2[d] = { text: " ", isCorrect: false }
    console.log(Choices2)
    Edit(Questions2, Choices2, index2, images, Answerdetail, CorrectANS)
  }

  function selectDelete(Questions3, Choices3, index3, numI, Images, Answerdetail, CorrectANS) {
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
    Edit(Questions3, Choice, index3, Images, Answerdetail, CorrectANS)
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
  function ImageAdd(Num) {
    const payload = {
      images: value4.images,
      Num: Num
    }
    Imageadd(payload, EXid)
      .then(res => {
        Toast.fire({
          position: 'top-end',
          icon: 'success',
          title: res.data
        })
        setValue4({ ...value4, images: [] })
        loadData(EXid)

      }).catch(err => {
        console.log(err);
      })

  }
  function ImageRemove(Num, public_id) {
    const images = Data[Num - 1].images
    let i = 0
    const payload = {
      images: [],
      Num: Num
    }
    while (i < images.length) {
      if (images[i].public_id !== public_id) {
        payload.images.push(images[i])
      }
      i++
    }
    setLoad(true)
    console.log(payload);
    // const img = values.images
    axios
      .post(
        process.env.REACT_APP_API + "/removeimages",
        { public_id },
        {
          headers: {
            authtoken: store.userStore.user.token,
          },
        }
      )
      .then((res) => {
        Imageremove(payload, EXid)
          .then(res => {
            setLoad(false)
            Toast.fire({
              position: 'top-end',
              icon: 'success',
              title: res.data
            })
            loadData(EXid)

          }).catch(err => {
            console.log(err);
          })

      })
      .catch((err) => {
        //err
        setLoad(false)
        console.log(err);
      });
  }
  const [checked, setChecked] = useState([]);
  const handleCheck = (e) => {
    var updatedList = [...checked];
    if (e.target.checked) {
      updatedList = [...checked, e.target.value];
    } else {
      updatedList.splice(checked.indexOf(e.target.value), 1);
    }
    setChecked(updatedList);
  };

  function correctAnswer(Num, Choices) {
    const TrueChoice = checked.sort()

    console.log(TrueChoice)
    console.log(Num)
    let i = 0
    let d = 0
    while (i < Choices.length) {
      Choices[i].isCorrect = false
      while (d < checked.length) {
        if (checked[d] == i) {
          Choices[i].isCorrect = true
        }
        d++
      }
      i++
      d = 0
    }
    console.log(Choices)

    const payload = {
      Choices: Choices,
      CorrectANS: checked,
      Num: Num
    }
    CorrectAnswer(EXid, payload)
      .then(res => {
        setChecked([])
        Toast.fire({
          position: 'top-end',
          icon: 'success',
          title: res.data
        })
        loadData(EXid)
        document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
      }).catch(err => {
        console.log(err);
      })

  }


  return (
    <div className="container" >
      <div className="top-body">
        <div className="sticky-top" >
          <div className="form-check">
            <input onChange={() => handleChange()} className="form-check-input" type="checkbox" />
            <label className="form-check-label" >
              Edit mode
            </label>
          </div>
          <button type="submit" className="btn btn-primary" onClick={() => AddExam(Data.length + 1)}>Addexam</button>
        </div>
      </div>
      <div className="body">
        <div className="examchoices-card" >
          <h4> QuestionName : {Head.name}</h4>
          <textarea name="QuestionName" className="form-control" rows="3" onChange={handleChangeh} defaultValue={Head.name}>{Head.name}</textarea>
          <h4> Title : {Head.title}</h4>
          <textarea name="Title" className="form-control" onChange={handleChangeh} defaultValue={Head.title}></textarea>
          <div className="form-group">
            <h4 htmlFor="exampleFormControlSelect1">Category : {Catname}</h4>
            <select defaultValue={Catid} className="form-control" id="exampleFormControlSelect1" name="Categoryid" onChange={handleChangeh}>
              <option value={Catid} >{Catname}</option>
              {cat.map((item, indexcat) =>
                <option key={indexcat} value={item._id}>{item.name}</option>

              )}
            </select>
            <br />
            <button className="btn btn-secondary" onClick={() => EditH()}><AiFillEdit /></button>
          </div>

        </div>
        {Data.map((item, index) =>
          <div key={index} className="examchoices-card" >
            <fieldset disabled={isDisabled}>
              <div className="text-center">
                {item.images.map((mage, mageindex) =>
                  <span key={mageindex} style={{ color: "red", cursor: "pointer", fontSize: 45 }} className="badge badge-danger" onClick={() => ImageRemove(index + 1, mage.public_id)}>
                    <img src={mage.url} className="fluid" alt=" " />
                    <BsXLg />
                  </span>

                )}
              </div>
              <FileUpload loading={loading} setLoad={setLoad} values={value4} setValue4={setValue4} />
              {loading || item.images.length > 0
                ? <button type="button" className="btn btn-primary" disabled onClick={() => ImageAdd(index + 1)}>Loading... </button>
                : <button type="button" className="btn btn-primary" onClick={() => ImageAdd(index + 1)}>Add Image </button>
              }
              <br />
              <br />
              <div className="form-group">
                <h5> QuestionNumber: {index + 1}</h5>
                <textarea name="Question" className="form-control" onChange={handleChangeQ} rows="5" defaultValue={item.Question}></textarea>
                <br />
                <div>

                  <button type="button" className="btn btn-primary" onClick={(Questions2) => selectAdd(item.Question, item.Choices, index + 1, item.images, item.Answerdetail, item.CorrectANS)}>Add answer <AiOutlinePlus /></button>
                  &nbsp;&nbsp;
                  <button type="button" className="btn btn-primary" onClick={() => correctAnswer(index + 1, item.Choices)}>Save Correct answer</button>
                </div>
                <div>
                  <br />
                  <h5>Correct Answer :
                    <span> answer :  </span>
                    {item.CorrectANS.map((C, Cnum) =>
                      Cnum < item.CorrectANS.length - 1
                      
                        ? <span key={Cnum}>{parseInt(C) + 1},</span>
                        : <span key={Cnum}>{parseInt(C) + 1}</span>
                      
                    )}
                  </h5>
                </div>
                {item.Choices.map((num, numI) =>
                  <div key={numI} className="form-group">

                    <table className="table">
                      <thead>
                        <tr>
                          <td> <label>{numI + 1}</label></td>
                          <td> <textarea name={numI} className="form-control" rows="1" defaultValue={num.text} onChange={handleChangeC} ></textarea></td>

                          <td>
                            <input name={numI} className="form-check-input" type="checkbox" value={numI} onChange={handleCheck} />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button type="button" className="btn btn-danger" onClick={(Questions2) => selectDelete(item.Question, item.Choices, index + 1, numI, item.images, item.Answerdetail, item.CorrectANS)}> <AiFillDelete /> </button>

                          </td>
                          <td>
                            {
                              num.isCorrect
                                ? <div style={{ backgroundColor: "green" }}>true</div>
                                : <div style={{ backgroundColor: "red" }}>false</div>
                            }
                          </td>
                        </tr>
                      </thead>
                    </table>
                  </div>
                )}
                <h5> Answer detail</h5>
                <textarea name="Answerdetail" className="form-control" rows="5" defaultValue={item.Answerdetail} onChange={handleChangeQ}></textarea>
                <br />
                <button className="btn btn-secondary" onClick={(Question) => Edit(item.Question, item.Choices, index + 1, item.images, item.Answerdetail, item.CorrectANS)}><AiFillEdit /></button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn btn-danger" onClick={() => Delete(index + 1)}><AiFillDelete /></button>
              </div>
            </fieldset>
          </div>

        )
        }
      </div >
    </div >
  )
}

export default ExamChoices