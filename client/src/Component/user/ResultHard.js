import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {  HardlogS } from "../../Function/Person"
function ResultHard() {
    const navigate = useNavigate();
    const user = useSelector((state) => ({ ...state }))
    const Userid = user.userStore.user.ObjectID
    const [dataExamHard, setDataExamHard] = useState([]);
  
  
    const DataHard = Object.values(dataExamHard);
  
    console.log(dataExamHard)
    useEffect(() => {
        loadExamData(Userid)

    }, [Userid])

    function loadExamData(id) {
        const payload={
            Index:localStorage.Index
        }
        HardlogS(id,payload).then((res) => {
            setDataExamHard(res.data);
        });
    }
   


    return (

        <div>ResultHard</div>
    )
}

export default ResultHard