import axios from 'axios'

export const listUser = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API +"/person",
  {
    headers:{
      authtoken
    }
});
export const changRole = async (authtoken,value) =>
  await axios.post(process.env.REACT_APP_API +"/chang-role",
  {
    headers:{
      authtoken
    }
});