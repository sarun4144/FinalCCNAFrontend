import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'
import { currentadmin } from '../Function/Auth'
 const AdminRoute  =  ({children}) =>  {
    const user =  useSelector((state) => ({...state}))
    const Token =user.userStore.user.token
    const [ok , setOk] = useState(false)
   useEffect(() => {
    if(user && Token){
        currentadmin(Token).then(res => {
           console.log("Admin",res)
            setOk(true) 
        }).catch(err => {
           console.log(err)
            setOk(false)
        })
    }
   },[Token])
    return ok
    ? children
    : <LoadingToRedirect />
}

export default AdminRoute