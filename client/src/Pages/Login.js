import React from "react";
import {Link} from "react-router-dom"
function Login() {
    return(
        <>
    <div style={{textAlign:'center'}}>
         <h1>The input element</h1>
        <form action="/">
            <label for="fname">First name :</label>
            <input style={{marginLeft:'5px'}} type="text" id="fname" name="fname"/>
            <br/><br/>
            <label for="lname">Last name :</label>
            <input style={{marginLeft:'5px'}} type="text" id="lname" name="lname"/>
            <br/><br/>
            <button onClick={GO}>Login</button>
        </form>
    </div>
    </>
    )
}

export default Login;

function GO() {
        return (
        <Link to="/login" ></Link>
            
          );
        
    }
  