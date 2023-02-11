
import axios from 'axios'

export const Imageadd = async (value,id) =>
  await axios.post(process.env.REACT_APP_API_CLOUD + "/Imageadd/"+id,value, {
    
  });
export const Imageremove = async (value,id) =>
  await axios.post(process.env.REACT_APP_API_CLOUD + "/Imageremove/"+id, value, {
   
  });