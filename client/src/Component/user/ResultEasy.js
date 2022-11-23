import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {  EastlogS } from "../../Function/Person"
function ResultEasy() {
    const navigate = useNavigate();
    const user = useSelector((state) => ({ ...state }))
    const Userid = user.userStore.user.ObjectID
    const [dataExamEasy, setDataExamEasy] = useState([]);
  
  
    const DataHard = Object.values(dataExamEasy);
  
    console.log(dataExamEasy)
    useEffect(() => {
        loadExamData(Userid)

    }, [Userid])

    function loadExamData(id) {
        const payload={
            Index:localStorage.Index
        }
        EastlogS(id,payload).then((res) => {
            setDataExamEasy(res.data);
        });
    }
   


    return (

        <div>ResultHard</div>
    )
}

export default ResultEasy