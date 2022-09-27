
import axios from 'axios'

export const examadd = async (value) =>
  await axios.post(process.env.REACT_APP_API + "/examadd", value, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

export const listexam = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API + "/listexam", {
    headers: {
      authtoken
    }
  });

  export const currentexam = async (id) =>
  await axios.post(process.env.REACT_APP_API + "/current-exam/"+id,
  {
    headers:{
      id
    }
});
  export const examchoicesadd = async (id,Adddata) =>
  await axios.post(process.env.REACT_APP_API + "/examchoicesadd/"+id,Adddata,
  {
    headers:{
      id
    }
});
  export const examchoicesinclude = async (id,Adddata) =>
  await axios.post(process.env.REACT_APP_API + "/examchoicesinclude/"+id,Adddata,
  {
    headers:{
      id
    }
});