import React, { useState } from 'react'
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { FakeData } from './FakeData';

const LineChart = () => {
    const [scoreData, setScoreData] = useState({
        labels: FakeData.map((data) => data.id),
        datasets: [
            {
                label: "Score",
                data: FakeData.map((data) => data.Score),
                backgroundColor: "cyan",
                borderColor: "black",
                borderWidth: 2,
            }
        ]
    })
    return (
        <div>
            <Line data={scoreData}></Line>
        </div>
    )
}

export default LineChart
