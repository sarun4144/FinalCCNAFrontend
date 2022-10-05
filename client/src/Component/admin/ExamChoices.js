import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { currentexam, examchoicesadd, examChoiceschange, examChoicesdelete, examReset } from "../../Function/Exam"
import Toast from "../../Alert/Success";


function ExamChoices() {
  const [data, setData] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [value, setValue] = useState({

  })

  const [value2, setValue2] = useState({
    Question: null
  })
  const store = useSelector((state) => ({ ...state }))
  const EXid = store.examStore.exam.examid
  const Data = Object.values(data);
  console.log("DATA", data)
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
    const NewData = {
      
    }
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
    console.log(NewData)
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
    examChoicesdelete(EXid, Num)
      .then(res => {
        reSet(res.data.exdata)
      }).catch(err => {
        console.log(err);
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


  const Edit = async (Questions, Choices,index) => {
    const Values = {
      Question: "",
    }
    const payload = {
      Question: "",
      Choices: [],
      Num:index
    }
    const result = Object.values(value);
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

    } catch (err) {

    }
    console.log("Finalpayload", payload)
    examChoiceschange(EXid, payload)
      .then(res => {

      }).catch(err => {
        console.log(err);
      })
  };

  return (
    <div className="container" >
      <div className="sticky-top" style={{ marginLeft: "110%" }}>
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
              {item.Choices.map((num, numI) =>
                <div className="form-group">
                  <label>{numI + 1}</label>
                  <textarea name={numI} className="form-control" rows="1" defaultValue={num} onChange={handleChangeC} ></textarea>
                </div>
              )}
              <button className="btn btn-primary" onClick={(Question) => Edit(item.Question, item.Choices,index+1)}>Addexam</button>
              <button className="btn btn-danger" onClick={() => Delete(index + 1)}>Delete</button>
            </div>
          </fieldset>
        </div>

      )}


    </div>
  )
}

export default ExamChoices