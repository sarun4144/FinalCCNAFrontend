import React, { useState, useEffect } from "react";
import Switch from '@mui/material/Switch';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Navbaradmin from './Navadmin';
import { useSelector } from "react-redux";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import * as moment from 'moment';
import AdminToolbar from "./AdminToolbar";
import './Adminhome.css'
//alert
import Swal from 'sweetalert2'
import Confirm from "../../Alert/Confirm";
//function
import { listUser, changeStatus, changeRole, removeUser, changePassword } from '../../Function/Person'

function ManagAdmin() {
  const user = useSelector((state) => ({ ...state }))
  const [data, setData] = useState([]);
  const Token = user.userStore.user.token
  console.log("Data", data);
  useEffect(() => {
    //code
    loadData(Token)
  }, [Token]);

  const loadData = (authtoken) => {
    listUser(authtoken).then(res => {
      setData(res.data)
    }).catch(err => {
      console.log(err.response.data)
    })
  }
  const handleChangeStatus = (e, id) => {
    const value = {
      id: id,
      enabled: e.target.checked,
    };
    console.log(user.userStore.user.token, value)
    changeStatus(user.userStore.user.token, value).then((res) => {
      console.log(res);
      loadData(user.userStore.user.token);
    })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleChangeRole = (e, id) => {
    const value = {
      id: id,
      role: e.target.value,
    };
    console.log(user.userStore.user.token, value)
    changeRole(user.userStore.user.token, value).then((res) => {
      console.log(res);
      loadData(user.userStore.user.token);
    })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleRemove = (id) => {
    Confirm.fire({
      title: 'ยืนยัน!!',
      text: "คุณต้องการจะลบ User ใช่หรืไม่",
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'ลบ User สำเร็จ!',
          text: 'User ได้ถูกลบแล้ว',
          icon: 'success'
        })
        console.log(user.userStore.user.token, id)
        removeUser(user.userStore.user.token, id).then((res) => {
          console.log("Delete", res);
          loadData(user.userStore.user.token);
        }).catch((err) => {
          console.log(err.response);
        });
      }
    })


  }
  const [values, setValues] = useState({
    id: "",
    password: ""
  })
  const ShowEdit = async (id) => {
    const { value: password } = await Swal.fire({
      title: 'แก้ไข',
      input: 'password',
      inputLabel: 'ใส่รหัสผ่าน',
      inputPlaceholder: 'ใส่รหัสผ่านใหม่',
      confirmButtonText: 'ยืนยัน',
      confirmButtonColor: 'green',
    })
    if(password) {
      setValues({ ...values, id: id, password: password });
      changePassword(user.userStore.user.token,values.id, { values })
        .then(res => {
          Swal.fire({
            title: 'แก้ไข Password สำเร็จ',
            confirmButtonText: 'ยืนยัน',
            confirmButtonColor: 'green',
          })
          console.log('Password', res)
          loadData(user.userStore.user.token);
        }).catch(err => {
          console.log(err.response)
        })
    }

  }
  const roleData = ["admin", "user"];
  return (
    <div className="adminwrap">
      <AdminToolbar/>
    <div className='admincontainer'>
      <div className='row'>
        
        <div className='col' >
          <h1>Admin Management Page</h1>
          <Table className="table">
            <thead>
              <tr>
                <th scope="col">Email</th>
                <th scope="col">Username</th>
                <th scope="col">Role</th>
                <th scope="col">Status</th>
                <th scope="col">Create</th>
                <th scope="col">Update</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) =>
                <tr>
                  <th >{item.email}</th>
                  <td>{item.username}</td>
                  <td>
                    {item.role === 'admin'
                      ?
                      <select
                        className="form-select"
                        style={{ width: "100px", backgroundColor: "lightgreen" }}
                        defaultValue={item.role}
                        onChange={e => handleChangeRole(e, item._id)}
                      >
                        {roleData.map((item, index) =>
                          <option value={item} key={index}>
                            {item}
                          </option>
                        )}

                      </select>
                      : <select
                        className="form-select"
                        style={{ width: "100px", backgroundColor: "lightskyblue" }}
                        defaultValue={item.role}
                        onChange={e => handleChangeRole(e, item._id)}
                      >
                        {roleData.map((item, index) =>
                          <option value={item} key={index}>
                            {item}
                          </option>
                        )}

                      </select>
                    }
                  </td>

                  <td>
                    <Switch checked={item.enabled} color="success" onChange={e => handleChangeStatus(e, item._id)} />
                  </td>
                  <td>
                    {moment(item.createdAt).locale("th").format("ll")}
                  </td>
                  <td>
                    {moment(item.updatedAt)
                      .locale("th")
                      .startOf(item.updatedAt)
                      .fromNow()}
                  </td>
                  <td>
                    <button type="button" className="btn btn-danger"> <AiFillDelete onClick={() => handleRemove(item._id)} /> </button>
                    <button type="button" className="btn btn-secondary"><AiFillEdit onClick={() => ShowEdit(item._id)} /></button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
      <div className='col-md-2'>
      </div>
    </div>
    </div>
  )


}

export default ManagAdmin 