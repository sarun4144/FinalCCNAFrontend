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
    const labelsL = DataName.slice(DataName.length - 5, DataName.length).map((data) => data.Examname);
    const dataEasyL = {
        labels: labelsL,
        datasets: [{
            label: 'Score',
            data: DataName.slice(DataName.length - 5, DataName.length).map((data) => data.Score),
            fill: true,
            backgroundColor: [
                "rgba(75,192,192,0.45)"
            ],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0,
            borderWidth: 2,
        }]
    };
    const labelsS = DataName.map((data) => data.Examname);
    const dataEasyS = {
        labels: labelsS,
        datasets: [{
            label: 'Score',
            data: DataName.map((data) => data.Score),
            fill: true,
            backgroundColor: [
                "rgba(75,192,192,0.45)"
            ],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0,
            borderWidth: 2,
        }]
    };

    return (
        <div>
            {DataName.length > 5 ?
                <Line data={dataEasyL}></Line>
                :
                <Line data={dataEasyS}></Line>
            }
        </div>
    )
}

export default LineChart
