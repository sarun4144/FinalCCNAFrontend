import React from 'react'
import { useDispatch } from 'react-redux'
import {login,logout} from '../Store/userSilce'
const TestRedux2 = () => {
    const dispatch = useDispatch();
    const user = {
        username:"sarun",
        password: "414424"
    }

    const handleLogin = ()=>{
        dispatch(login(user))
    }
    const handleLogout = ()=>{
        dispatch(logout())
    }
  return (
    <div>
        <h1>TestRedux2</h1>
        <br/> 
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button>
        </div>
  )
}

export default TestRedux2