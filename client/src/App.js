import React,{ useEffect } from 'react';
import './App.css';
import { BrowserRouter ,Route, Routes } from "react-router-dom"

import {login} from './Store/userSilce'
import { checkin } from './Store/examSilce';

import { useDispatch} from 'react-redux'
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
import Store from './Pages/Store';
import Info from './Pages/Info';
//userpage
import Profile from './Component/user/Profile';

//adminpage
import Adminhome from './Component/admin/Adminhome';
import ManagAdmin from './Component/admin/ManageAdmin';
import ExamAdd from './Component/admin/ExamAdd';
import CategoryAdd from './Component/admin/CategoryAdd';
import ExamChoices from './Component/admin/ExamChoices';
//function
import {currentuser} from './Function/Auth'
import { readCategory } from './Function/Category';
 
//protectRoute
import UserRoute from './Routes/UserRouter';
import AdminRoute from './Routes/AdminRouter';

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    const idtoken = localStorage.token
    const examid = localStorage.examid
    const catid = localStorage.catid
  
  if(idtoken){
    currentuser(idtoken)
    .then(res =>{
      const user = {
        token: idtoken,
        username:res.data.username,
        role:res.data.role,
        email:res.data.email
    }
    dispatch(login(user))
      console.log('Current-User',res.data)
    }).catch(err =>{
      console.log(err);
    })
  }
  if(examid){ 
    readCategory(idtoken,catid)
    .then(res =>{
      const EXAM = {
        examid: examid,
        category:res.data.name,
        catid: catid
     }
       dispatch(checkin(EXAM))
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
      <Route exact path="/" element={<><Header/><main style={{marginTop: '78px'}}><Banner/><Content/></main></>}/>
      <Route path ="/Info" element={<><Header/><main style={{marginTop: '78px'}}><Info /></main></>}/>
      <Route path ="/about" element={<><Header/><main style={{marginTop: '78px'}}><About /></main></>}/>
      <Route path ="/login" element={<><Header/><main style={{marginTop: '78px'}}><Login /></main></>}/>
      <Route path ="/register" element={<><Header/><main style={{marginTop: '78px'}}><Register /></main></>}/>
      <Route path ="/store" element={<><Header/><main style={{marginTop: '78px'}}><Store /></main></>}/>


    <Route path ="/user/profile" element={<UserRoute><><Header/><main style={{marginTop: '78px'}}><Profile /></main> </> </UserRoute>}/>

    <Route path ="/admin/home" element={<AdminRoute> <><Header/><main style={{marginTop: '78px'}}><Adminhome /></main></> </AdminRoute>}/>
    <Route path ="/admin/manageadmin" element={<AdminRoute> <><Header/><main style={{marginTop: '78px'}}><ManagAdmin /></main></> </AdminRoute>}/>
    <Route path ="/admin/examadd" element={<AdminRoute> <><Header/><main style={{marginTop: '78px'}}><ExamAdd /></main></> </AdminRoute>}/>
    <Route path ="/admin/categoryadd" element={<AdminRoute> <><Header/><main style={{marginTop: '78px'}}><CategoryAdd /></main></> </AdminRoute>}/>
    
    <Route path ="/admin/examchoices" element={<AdminRoute> <><Header/><main style={{marginTop: '78px'}}><ExamChoices /></main></> </AdminRoute>}/>
    
    
     
    </Routes>
    </BrowserRouter>
  </div>
   
  );
}

export default App;