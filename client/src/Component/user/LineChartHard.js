import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { FakeData } from './FakeData';
import { useSelector } from "react-redux";
import { Hardlog } from "../../Function/Person"

const LineChartHard = () => {
    const user = useSelector((state) => ({ ...state }))
    const Userid = user.userStore.user.ObjectID

    const [dataExamHard, setDataExamHard] = useState([]);

    useEffect(() => {
        loadExamData(Userid)

    }, [Userid])

    useEffect(() => {
        loadExamData(Userid)

    }, [])

    function loadExamData(id) {
        Hardlog(id).then((res) => {
            setDataExamHard(res.data);
        });
        /*
        const payload = {
          Index: localStorage.Index
      }
      EastlogS(id, payload).then((res) => {
          setDataExamEasy(res.data.Examname);

      });*/
    }

    const DataName = Object.values(dataExamHard);

    const labelsL = DataName.slice(DataName.length - 5, DataName.length).map((data) => data.Examname);
    const dataHardL = {
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
    const dataHardS = {
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
                <Line data={dataHardL}></Line>
                :
                <Line data={dataHardS}></Line>
            }
        </div>
    )
}

export default LineChartHard
