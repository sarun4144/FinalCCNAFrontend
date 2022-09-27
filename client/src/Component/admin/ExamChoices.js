import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { currentexam, examchoicesadd } from "../../Function/Exam"
import Toast from "../../Alert/Success";
function ExamChoices() {
  const [data, setData] = useState({});
  const [Adddata, setAdddata] = useState({
    Num: "1"
  }); const [Addchoices, setAddchoices] = useState({
    Question: " ",
    Num: " "
  });
  const store = useSelector((state) => ({ ...state }))
  const EXid = store.examStore.exam.examid
  const Data = Object.values(data);
  console.log(data)
  useEffect(() => {

    loadData(EXid)
  }, [EXid])

  function loadData(id) {
    currentexam(id)
      .then(res => {
        setData(res.data.exdata)

      }).catch(err => {
        console.log(err);
      })
  }
  async function AddExam(num) {
    await setAdddata({ ...Adddata, Num: num })
    console.log(Adddata)

    examchoicesadd(EXid, Adddata)
      .then(res => {
        Toast.fire({
          position: 'top-end',
          icon: 'success',
          title: res.data
        })
        setAdddata({ ...Adddata, Num: num })
        loadData(EXid);
      }).catch(err => {
        console.log(err);
      })

  }


  return (
    <div className="container" >
      <button type="submit" className="btn btn-primary" onClick={() => AddExam(Data.length + 1)}>Addexam</button>
      {Data.map((item, index) =>
        <div className="card">
          <div className="form-group">
            <label> QuestionNumber: {index + 1}</label>
            <textarea className="form-control"  rows="2" >{item.Question}</textarea>
            <div className="form-group">
            </div>
            {item.Choices.map((num, numI) =>
              <div className="form-group">
                <label>{numI + 1}</label>
                <textarea className="form-control" rows="1">{num}</textarea>
              </div>
            )}
          </div>
        </div>
      )}


    </div>
  )
}

export default ExamChoices