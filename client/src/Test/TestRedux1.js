import React from 'react'
import { useSelector } from 'react-redux'
const TestRedux1 = () => {

const Main = useSelector((state)=>({...state}))
console.log('userStore',Main);
  return (
    <div>
       <h1>TestRedux1</h1> 
       {Main.It.value}
    {/*<br /> 
       store:<h2>{userStore.value}</h2>
       <br /> 
    {
        userStore.Loading 
       ? <p>Loading...</p>
       : <p>Login sucess</p>
    } */}
    </div>
  )
}

export default TestRedux1