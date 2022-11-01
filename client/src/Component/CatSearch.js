import React, { useState, useEffect } from "react";
import { listCategory } from "../Function/Category";
import { useSelector } from "react-redux";
import Dropdown from 'react-bootstrap/Dropdown';

const CatSearch = () => {
    const user = useSelector((state) => ({ ...state }))

    const [category, setData] = useState([]);
    const Token = user.userStore.user.token
    /*console.log("Data", category);*/
    useEffect(() => {
        //code
        loadData(Token)
    }, [Token]);

    const loadData = (authtoken) => {
        listCategory(authtoken).then(res => {
            /*console.log(res.data)*/
            setData(res.data)
        }).catch(err => {
            console.log(err.response.data)
        })
    }

    const [value, setValue] = useState({
        name: " "

    })

    return (
        <div className="cat-dropdown-container">
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-cat">
                Select Category
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {category.map((item) =>
                    <Dropdown.Item>{item.name}</Dropdown.Item>
                )}
            </Dropdown.Menu>

        </Dropdown>
        </div>
    )
}

export default CatSearch
