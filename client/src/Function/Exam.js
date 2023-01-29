
import axios from 'axios'

export const examadd = async (authtoken,value) =>
  await axios.post(process.env.REACT_APP_API + "/examadd", value, {
    headers:{
      authtoken
    }
  });

export const listexam = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API + "/listexam", {
    headers: {
      authtoken
    }
  });
export const listexamSort = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API + "/listexamSort", {
    headers: {
      authtoken
    }
  });
export const listexamSortDate = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API + "/listexamSortDate", {
    headers: {
      authtoken
    }
  });

  export const currentexam = async (id) =>
  await axios.post(process.env.REACT_APP_API + "/current-exam/"+id,
  {
});

  export const examchoicesadd = async (id,Adddata) =>
  await axios.post(process.env.REACT_APP_API + "/examchoicesadd/"+id,Adddata,
  {
    headers:{
      id
    }
});
  export const examChoiceschange = async (id,payload) =>
  await axios.post(process.env.REACT_APP_API + "/examChoiceschange/"+id,payload,
  {
    headers:{
      id
    }
});
  export const examChoicesdelete = async (id,deletedata) =>
  await axios.post(process.env.REACT_APP_API + "/examChoicesdelete/"+id,deletedata,
  {
    headers:{
      id
    }
});
  export const examReset = async (id,data) =>
  await axios.post(process.env.REACT_APP_API + "/examReset/"+id,data,
  {
    headers:{
      id
    }
});
  export const examHeadChange = async (id,payload) =>
  await axios.post(process.env.REACT_APP_API + "/examHeadChange/"+id,payload,
  {
    headers:{
      payload
    }
});

  export const CorrectAnswer = async (id,payload) =>
  await axios.post(process.env.REACT_APP_API + "/CorrectAnswer/"+id,payload,
  {
    headers:{
      id
    }
});
  export const EasyRecord = async (id,payload) =>
  await axios.post(process.env.REACT_APP_API + "/EasyRecord/"+id,payload,
  {
    
  });
  export const HardRecord = async (id,payload) =>
  await axios.post(process.env.REACT_APP_API + "/HardRecord/"+id,payload,
  {
    
  });
  export const CountStamp = async (id,payload) =>
  await axios.post(process.env.REACT_APP_API + "/CountStamp/"+id,payload,
  {
    
  });
  export const removeExam = async (id) =>
  await axios.delete(process.env.REACT_APP_API + "/removeExam/"+id,
  {
    
  });