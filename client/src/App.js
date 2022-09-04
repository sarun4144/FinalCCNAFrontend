import React,{ useState , useEffect } from 'react';
import './App.css';
import { BrowserRouter ,Route, Routes } from "react-router-dom"

import {login} from './Store/userSilce'
import { useDispatch } from 'react-redux'
//notification
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//landdingpage
import Header from './Component/Header'
import About from './Pages/About';
import Banner from './Component/Banner';
import Login from './Pages/Login';
import Register from './Pages/Register';

//userpage
import Home from './Component/user/Home';

//adminpage
import Ahome from './Component/admin/Ahome';

//function
import {currentuser} from './Function/Auth'

 
function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
   
    const idtoken = localStorage.token
  if(idtoken){
    currentuser(idtoken)
    .then(res =>{
      const payload = {
        token: idtoken,
        username:res.data.username,
        role:res.data.role
    }
    dispatch(login(payload))
      console.log(res.data)
    }).catch(err =>{
      console.log(err);
    })
  }
  })
  
  return (
  
    <div>
      <BrowserRouter>
      <ToastContainer/>
    <Routes>
      <Route exact path="/" element={<><Header/><Banner/></>}/>
      <Route path ="/about" element={<><Header/><About /></>}/>
      <Route path ="/login" element={<><Header/><Login /></>}/>
      <Route path ="/register" element={<><Header/><Register /></>}/>


     <Route path ="/user/home" element={<><Home /></>}/>

     <Route path ="/admin/home" element={<><Ahome /></>}/>
    </Routes>
    </BrowserRouter>
  </div>
   
  );
}

export default App;