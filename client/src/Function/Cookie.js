import axios from 'axios'

export const cookieSet = async (value) =>
  await axios.post(process.env.REACT_APP_API + "/cookieSet",value, {
   
  });