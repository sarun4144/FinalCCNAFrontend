import React, { useState, useEffect } from "react";
import "./ComponentCSS/Content.css"
import { listexamSort,listexamSortDate } from "../Function/Exam"
import {reads } from "../Function/Person"
function Content() {
    const [data, setData] = useState([]);
    const [log, setLog] = useState([]);

    console.log(data)
    useEffect(() => {
        //code
        loadData();
        // reads()

    }, []);

    const loadData = () => {
        listexamSort().then(res => {
            setData(res.data[0])
        }).catch(err => {
            console.log(err.response.data)
        })
        listexamSortDate().then(res =>{
            setLog(res.data[0])
        }).catch(err => {
            console.log(err.response.data)
        })

    }

    return (
        <div className='mainBackground'>
            <div className='content-container'>
                <section className="content-con">
                    <div className="content-r">
                        <div className="content-Head">
                        <span>The Most Popular Exam </span> 
                        </div>
                        <div className="content-Text">
                            <p>
                                {data.name}
                            </p>
                            <p>
                                {data.title}
                            </p>
                            </div>
                        </div>
                   
                </section>
                <section className="content-con">
                    <div className="content-r">
                    <div className="content-Head">
                        <span>The Newest Exam !! </span> 
                        </div>
                        <div className="content-Text">
                            <p>
                                {log.name}
                            </p>
                            <p>
                                {log.title}
                            </p>
                            </div>
                        </div>
                   
                </section>
            </div>
        </div>
    )
}

export default Content