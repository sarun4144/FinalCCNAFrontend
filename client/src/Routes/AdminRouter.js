import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'
import { currentadmin } from '../Function/Auth'
 const AdminRoute  =  ({children}) =>  {
    const  User  =  useSelector((state) => ({...state}))
    const Token = User.userStore.user.token
    const [ok , setOk] = useState(false)
   useEffect(() => {
    if(User && Token){
        currentadmin(Token).then(res => {
            console.log("Admin",res)
            setOk(true)
        }).catch(err => {
            console.log(err)
            setOk(false)
        })
    }

   })
    return ok
    ? children
    : <LoadingToRedirect />
}

export default AdminRoute