import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbaradmin from './Navadmin';
function Adminhome() {
  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className="col-md-5">
                <Navbaradmin/>
            </div>
            <div className='col-md-3'>
                <h1> Admin Home</h1>
            </div>
            <div className='col-md-4'>
              
            </div>
        </div>
    </div>
  )
}

export default Adminhome