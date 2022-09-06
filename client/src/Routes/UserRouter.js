import React from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'

 const UserRoute  =  ({children}) =>  {
    const  User  =  useSelector((state) => ({...state}))
    const Token = User.userStore.user.token
    console.log('UserRoute',children)
    return User && Token
    ? children
    : <LoadingToRedirect />
}

export default UserRoute