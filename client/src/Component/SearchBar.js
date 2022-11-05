import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listexam } from "../Function/Exam";
import { checkout } from "../Store/examSilce";
import * as AiIcons from "react-icons/ai";

const SearchBar = () => {
    const user = useSelector((state) => ({ ...state }))
    const [searchTerm, setSearchTerm] = useState('')
    const [exam, setData] = useState([]);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const Token = user.userStore.user.token
    const [wordEntered, setWordEntered] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        //code
        loadData(Token)
    }, [Token, dispatch]);

    const loadData = (authtoken) => {
        listexam(authtoken).then(res => {
            setData(res.data)
        }).catch(err => {
            console.log(err.response.data)
        })
    }

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = exam.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };


    return (
        <div className='Search'>
            <div className='Search-bar'>
                <input type="text" placeholder="Search..." value={wordEntered} onChange={handleFilter} />
                <div className='SearchIcon'>
                    {filteredData.length === 0 ? (
                        <AiIcons.AiOutlineSearch />
                    ) : (
                        <AiIcons.AiOutlineClose id='clearBtn' onClick={clearInput} />
                    )}
                </div>
            </div>
            {
                filteredData.length != 0 && (
                    <div className='searchResult'>
                        {filteredData.slice(0, 15).map((item) => {
                            return (
                                <a1 className='resultItem' href='' target="blank">
                                    <p>{item.name} : {item.title}</p>
                                </a1>
                            )
                        })}

                    </div>
                )
            }
        </div>
    );
}

export default SearchBar
