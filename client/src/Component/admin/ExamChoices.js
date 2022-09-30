import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { currentexam, examchoicesadd } from "../../Function/Exam"
import Toast from "../../Alert/Success";


function ExamChoices() {
  const [data, setData] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [value, setValue] = useState({

  })
  const [value2, setValue2] = useState({

  })
  const store = useSelector((state) => ({ ...state }))
  const EXid = store.examStore.exam.examid
  const Data = Object.values(data);
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
    const NUM = {
      Num: num,
    }
    console.log(NUM)
    examchoicesadd(EXid, NUM)
      .then(res => {
        Toast.fire({
          position: 'top-end',
          icon: 'success',
          title: res.data
        })
        loadData(EXid);
      }).catch(err => {
        console.log(err);
      })


  }
  let Values = {
    Question: "",
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
  const payload = {
    Question: "",
    Choices: []
  }
  const Edit = async (Questions, Choices) => {
    const result = Object.values(value);
    Values.Question = Questions
    Values.Choices = Choices
    console.log("value", value)
    console.log("result", result)
    try {
      if (value2.Question) {
        Values.Question = value2.Question
        payload.Question = value2.Question
        console.log("Values", Values)
        console.log("payload", payload)

      } else {
        console.log("failValues", Values)
        payload.Question = Values.Question
      }
      if (result.length > 0) {
        let i = 0
        let p = 0
        let k = 0
        let object = value
        let Pair = Object.keys(Values.Choices)
        let Num = Object.keys(object)
        console.log(Num, { object }, Pair)
        while (i < Values.Choices.length) {
          if (Num[i] === Pair[i]) {
            payload.Choices.push(result[p])
            p += 1
            k += 1
          }
          if (Pair[i] !== Num[i] || Pair[i] === null) {
            for (let n = 0; n < Num.length; n++) {
              if (Pair[i] === Num[n]) {
                payload.Choices.push(result[p])
                p += 1
                k += 1
                break;
              }
                payload.Choices.push(Values.Choices[k])
                k += 1
              }
            
          }
          i += 1
        }
      }
    } catch (err) {
      console.log(err)
    }
    console.log("Finalpayload", payload)
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
              <button className="btn btn-primary" onClick={(Question) => Edit(item.Question, item.Choices)}>Addexam</button>
            </div>
          </fieldset>
        </div>

      )}


    </div>
  )
}

export default ExamChoices