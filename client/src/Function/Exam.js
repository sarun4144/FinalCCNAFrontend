
import axios from 'axios'

export const examadd = async (value) =>
  await axios.post(process.env.REACT_APP_API + "/examadd", value ,{
    headers: {
        'Content-Type': 'application/json'
    }
});

export const listexam = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API + "/listexam",{
    headers:{
      authtoken
    }
});