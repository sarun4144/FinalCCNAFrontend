import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listexam } from "../Function/Exam";
import { checkout } from "../Store/examSilce";
import * as AiIcons from "react-icons/ai";
import { checkin } from "../Store/examSilce";
import Swal from 'sweetalert2'

const SearchBar = () => {
    const user = useSelector((state) => ({ ...state }))
    const [searchTerm, setSearchTerm] = useState('')
    const [exam, setData] = useState([]);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const Token = user.userStore.user.token
    const [wordEntered, setWordEntered] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [searchCAT, setSearchCAT] = useState([]);
    const role = user.userStore.user.role
    const [track, setTrack] = useState(false);

    useEffect(() => {
        //code
        loadData(Token)
    }, [Token, dispatch]);

    useEffect(() => {
        setTrack(false)
    }, [track]);

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

    function startNavigate(id, catid) {
        const destination = exam.filter((item) => {
            return item._id === id;
        })
        {
            destination.map((startSearch) => {
                startSearch.CAT.map((cat) =>
                    setSearchCAT(cat.name)
                )
            }
            )
        }
        setTrack(true)
        console.log(searchCAT)
        SeeExam(id, catid, searchCAT)
    }

    function SeeExam(id, catid, category) {
        // if (role) {
            if (role === "admin") {
                navigate("/admin/home")
            } else {
                const EXAM = {
                    examid: id,
                    catid: catid,
                    category: category
                }
                dispatch(checkin(EXAM))
                localStorage.setItem('examid', id)
                localStorage.setItem('catid', catid)
                navigate("/user/extest")
            }
        // } else {
        //     Swal.fire({
        //         position: 'top',
        //         title: 'Error!',
        //         text: "กรุณา Login",
        //         icon: 'error',
        //         iconColor: 'Red',
        //         confirmButtonColor: '#3085d6',
        //         confirmButtonText: 'ตกลง'
        //     })
        //     navigate("/login")
        // }
    }


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
                filteredData.length !== 0 && (
                    <div className='searchResult'>
                        {filteredData.slice(0, 15).map((item, index) => {
                            { console.log(item) }
                            return (<>
                                {item.CAT.map((cat) => 
                                <a1 key={index} className='resultItem' href='' target="blank" onClick={() => SeeExam(item._id, item.Categoryid, cat.name)}>
                                    <p>{item.name} : {item.title}</p>
                                </a1>
                                )}
                            </>
                            )
                        })}

                    </div>
                )
            }
        </div>
    );
}

export default SearchBar
