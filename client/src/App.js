import React,{ useEffect } from 'react';
import './App.css';
import { BrowserRouter ,Route, Routes } from "react-router-dom"

import {login} from './Store/userSilce'
import { useDispatch,useSelector } from 'react-redux'
//notification
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//landdingpage
import Header from './Component/Header'
import About from './Pages/About';
import Banner from './Component/Banner';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Content from './Component/Cotent'

//userpage
import Home from './Component/user/Home';

//adminpage
import Ahome from './Component/admin/Ahome';

//function
import {currentuser} from './Function/Auth'

 
//protectRoute
import UserRoute from './Routes/UserRouter';
import AdminRoute from './Routes/AdminRouter';

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    const idtoken = localStorage.token
  if(idtoken){
    currentuser(idtoken)
    .then(res =>{
      const user = {
        token: idtoken,
        username:res.data.username,
        role:res.data.role
    }
    dispatch(login(user))
      console.log('Current-User',res.data)
    }).catch(err =>{
      console.log(err);
    })
  }
  },[dispatch])
  
  return (
  
    <div>
      <BrowserRouter>
      <ToastContainer/>
    <Routes>
      <Route exact path="/" element={<><Header/><Banner/><Content/></>}/>
      <Route path ="/about" element={<><Header/><About /></>}/>
      <Route path ="/login" element={<><Header/><Login /></>}/>
      <Route path ="/register" element={<><Header/><Register /></>}/>


     <Route path ="/user/home" element={<UserRoute><><Header/> <Home /></> </UserRoute>}/>

     <Route path ="/admin/home" element={<AdminRoute> <><Header/><Ahome /></> </AdminRoute>}/>
    </Routes>
    </BrowserRouter>
  </div>
   
  );
}

export default App;