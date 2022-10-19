import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => ({ ...state }))
  const username = user.userStore.user.username
  const role = user.userStore.user.role
  const email = user.userStore.user.email
  //console.log(username)
  //console.log(role)
  //console.log(email)
  return (
    <div className="mt-3 mb-5 mx-auto p-3 rounded"
        style={{width:'400px', background:'#cee'}}>
    <h1>User - Profile</h1>
    <div>Username : {username}</div>
    <div>Role : {role}</div>
    <div>Email : {email}</div>
    </div>
  )
}

export default Profile