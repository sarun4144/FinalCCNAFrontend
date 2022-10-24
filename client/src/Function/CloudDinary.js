
import axios from 'axios'

export const Imageadd = async (value,id) =>
  await axios.post(process.env.REACT_APP_API + "/Imageadd/"+id,value, {
    
  });
export const Imageremove = async (authtoken,value) =>
  await axios.post(process.env.REACT_APP_API + "/Imageremove", value, {
    headers:{
      authtoken
    }
  });