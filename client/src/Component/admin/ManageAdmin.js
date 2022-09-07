import React, { useState, useEffect } from "react";
import Switch  from '@mui/material/Switch';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbaradmin from './Navadmin';
import { useSelector } from "react-redux";
//function
import {listUser,changRole} from '../../Function/Person'

function ManagAdmin() {
  const user =  useSelector((state) => ({...state}))
  const [data, setData] = useState([]);
  const Token =user.userStore.user.token
  console.log("Data", data);
  useEffect(() => {
    //code
    loadData(Token)
  }, [Token]);

  const loadData = (authtoken) =>{
    listUser(authtoken).then(res =>{
      setData(res.data)
    }).catch(err => {
      console.log(err.response.data)
    })
  }

  const handleOnchange = (checked,id) => {
    console.log(checked)
    const value = {
      id: id,
      enabled: checked,
    };
    console.log("Value",value);
    changRole(Token,value).then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.response);
    });
  };
  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className="col-md-2">
                <Navbaradmin/>
            </div>
            <div className='col-md-8' >
            <div className="card">
            <table className="table">
    <thead>
    <tr>
      <th scope="col">Email</th>
      <th scope="col">Username</th>
      <th scope="col">Role</th>
      <th scope="col">Status</th>
      <th scope="col">Create</th>
      <th scope="col">Update</th>
    </tr>
  </thead>
  <tbody>
  {data.map((item, index) => 
  <tr>
      <th scope="row">{item.username}</th>
      <td>{item.email}</td>
      <td>{item.role}</td>
      <td>
      <Switch checked	={item.enabled} color="success" onChange={(checked)=>handleOnchange(checked, item._id)} />
      </td>
      <td>{item.createdAt}</td>
      <td>{item.updatedAt}</td>
    </tr>
  
  )}
    
  </tbody>
</table>
            </div>
            </div>
            <div className='col-md-2'>
            </div>
        </div>
    </div>
  )
}

export default ManagAdmin 