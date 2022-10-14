import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { currentexam, examchoicesadd, examChoiceschange, examChoicesdelete, examReset } from "../../Function/Exam"
import Toast from "../../Alert/Success";
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import Confirm from "../../Alert/Confirm";
import Swal from 'sweetalert2'

function ExamChoices() {

  const [data, setData] = useState({});
  const Data = Object.values(data);
  const [isDisabled, setIsDisabled] = useState(true);
  const [value, setValue] = useState({

  })

  const [value2, setValue2] = useState({
    Question: null
  })
  const store = useSelector((state) => ({ ...state }))
  const EXid = store.examStore.exam.examid

  useEffect(() => {
    loadData(EXid)

  }, [EXid])

  function loadData(id) {
    currentexam(id).then((res) => {
      setData(res.data.exdata)
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
    } catch {
      console.log("ERROR")
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

  }

  function Delete(index) {
    const Num = {
      Num: index
    }
    console.log(index)
    Confirm.fire({
      title: 'ยืนยัน!!',
      text: "คุณต้องการจะลบ User ใช่หรืไม่",
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'ลบ User สำเร็จ!',
          text: 'User ได้ถูกลบแล้ว',
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


  const Edit = async (Questions, Choices, index) => {
    const Values = {
      Question: "",
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
        if (value[i] !== undefined) {
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

  function selectAdd(Questions, Choices, index) {
    const payload = {
      Question: Questions,
      Choices: Choices,
      Num: index
    }
    let d = payload.Choices.length + 1
    payload.Choices[d] = " "
    console.log(payload.Choices)
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
      {Data.map((item, index) =>
        <div className="card" >

          <fieldset disabled={isDisabled}>
            <div className="form-group">
              <label> QuestionNumber: {index + 1}</label>
              <textarea key={item.id} name="Question" className="form-control" defaultValue={item.Question} onChange={handleChangeQ} rows="2"></textarea>

              <div className="form-group">
              </div>
              <button type="button" className="btn btn-primary" onClick={(Question) => selectAdd(item.Question, item.Choices, index + 1)}><AiOutlinePlus /></button>
              {item.Choices.map((num, numI) =>
                <div className="form-group">
                  <table class="table">
                    <thead>
                      <tr>
                        <label>{numI + 1}</label>
                        <th> <textarea name={numI} className="form-control" rows="1" defaultValue={num} onChange={handleChangeC} ></textarea></th>
                        <th>
                          <button type="button" className="btn btn-danger"> <AiFillDelete /> </button>
                        </th>
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