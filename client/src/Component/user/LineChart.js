import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { FakeData } from './FakeData';
import { useSelector } from "react-redux";
import { EastlogS, Easylog } from "../../Function/Person"

const LineChart = () => {
    const user = useSelector((state) => ({ ...state }))
    const Userid = user.userStore.user.ObjectID

    const [dataExamEasy, setDataExamEasy] = useState([]);

    console.log(dataExamEasy)

    

    useEffect(() => {
        loadExamData(Userid)

    }, [Userid])

    useEffect(() => {
        loadExamData(Userid)

    }, [])


    function loadExamData(id) {
        Easylog(id).then((res) => {
            setDataExamEasy(res.data);
          });
          /*
          const payload = {
            Index: localStorage.Index
        }
        EastlogS(id, payload).then((res) => {
            setDataExamEasy(res.data.Examname);

        });*/
    }

    const DataName = Object.values(dataExamEasy);
    console.log(DataName)
    /*console.log(DataName)*/
    // const [scoreData, setScoreData] = useState({
        
    //     labels: FakeData.map((data) => data.Category),
    //     datasets: [
    //         {
    //             label: "Score",
    //             data: FakeData.map((data) => data.Score),
    //             backgroundColor: "cyan",
    //             borderColor: "black",
    //             borderWidth: 2,
    //         }
    //     ]
    // })
    const labels = DataName.map((data)=> data.Examname);
    const data = {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data: DataName.map((data) => data.Score),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        borderWidth: 2,
      }]
    };
    return (
        <div>
            <Line data={data}></Line>
        </div>
    )
}

export default LineChart
