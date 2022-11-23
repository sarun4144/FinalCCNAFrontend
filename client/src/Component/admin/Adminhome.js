import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbaradmin from './Navadmin';
import './Adminhome.css';
import './Navadmin.css'
import AdminToolbar from './AdminToolbar';
import { useSelector } from 'react-redux';

function Adminhome() {
  const admin = useSelector((state) => ({...state}))
  const adminUsername = admin.userStore.user.username
  const role = admin.userStore.user.role
  const email = admin.userStore.user.email

  return (
    <div className='adminwrap'>
      <AdminToolbar/>
    <div className='admincontainer'>
      
        <div className='row'>
          <center><h1> Admin Home</h1></center>
            <div className='col-md-3'>
                 <Navbaradmin/>
            </div>
            <div className='col-md-6'>
                
            </div>
            <div className='col-md-3'>
              
              <div className='adminprofile'>
              <div className='admin-card-header'><h2>Admin Profile</h2> </div> 
              <li>Adminname : {adminUsername}</li>
              <li>Role : {role}</li>
              <li>Email : {email}</li>
              </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Adminhome