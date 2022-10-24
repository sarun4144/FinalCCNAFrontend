import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbaradmin from './Navadmin';
import './Adminhome.css';
import AdminToolbar from './AdminToolbar';

function Adminhome() {
  return (
    <div className='adminwrap'>
      <AdminToolbar/>
    <div className='admincontainer'>
      
        <div className='row'>
          <center><h1> Admin Home</h1></center>
            <div className='col-md-2 mt-3 mb-5 mx-auto p-3 rounded'>
                 <Navbaradmin/>
            </div>
            <div className='col-md-6'>
                
            </div>
            <div className='col-md-4'>
              
            </div>
        </div>
    </div>
    </div>
  )
}

export default Adminhome