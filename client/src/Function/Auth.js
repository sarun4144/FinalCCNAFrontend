
import axios from 'axios'

export const register = async (value) =>
  await axios.post(process.env.REACT_APP_API + "/register", value ,{
    headers: {
        'Content-Type': 'application/json'
    }
});

export const userlogin = async (value) =>
  await axios.post(process.env.REACT_APP_API + "/login", value,{
    headers: {
        'Content-Type': 'application/json'
    }
});

export const currentuser = async (authtoken) =>
  await axios.post(process.env.REACT_APP_API + "/current-user", {},
  {
    headers:{
      authtoken
    }
});