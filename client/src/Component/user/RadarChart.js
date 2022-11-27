import React, { useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import { FakeData } from './FakeData';

const RadarChart = () => {
    const [scoreData, setScoreData] = useState({
        labels: FakeData.map((data) => data.Category),
        datasets: [
            {
                label: "Score",
                data: FakeData.map((data) => data.Score),
                backgroundColor: [
                    "rgba(75,192,192,0.45)"
                ],
                borderColor: "skyblue",
                borderWidth: 2,
            }
        ],
    })
    return (
        <div>
            <Radar data={scoreData}></Radar>
        </div>
    )
}

export default RadarChart
