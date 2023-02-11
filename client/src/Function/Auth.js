
import axios from 'axios'

export const register = async (value) =>
  await axios.post(process.env.REACT_APP_API_AUTH_AUTH + "/register", value ,{
    headers: {
        'Content-Type': 'application/json'
    }
});

export const userlogin = async (value) =>
  await axios.post(process.env.REACT_APP_API_AUTH + "/login", value,{
    headers: {
        'Content-Type': 'application/json'
    }
}); 

export const currentuser = async (authtoken) =>
  await axios.post(process.env.REACT_APP_API_AUTH + "/current-user", {},
  {
    headers:{
      authtoken
    }
});

export const currentadmin = async (authtoken) =>
  await axios.post(process.env.REACT_APP_API_AUTH + "/current-admin", {},
  {
    headers:{
      authtoken
    }
});