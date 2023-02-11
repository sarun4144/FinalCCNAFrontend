
import axios from 'axios'

export const examadd = async (authtoken,value) =>
  await axios.post(process.env.REACT_APP_API_EXAM + "/examadd", value, {
    headers:{
      authtoken
    }
  });

export const listexam = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API_EXAM + "/listexam", {
    headers: {
      authtoken
    }
  });
export const listexamSort = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API_EXAM + "/listexamSort", {
    headers: {
      authtoken
    }
  });
export const listexamSortDate = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API_EXAM + "/listexamSortDate", {
    headers: {
      authtoken
    }
  });

  export const currentexam = async (id) =>
  await axios.post(process.env.REACT_APP_API_EXAM + "/current-exam/"+id,
  {
});

  export const examchoicesadd = async (id,Adddata) =>
  await axios.post(process.env.REACT_APP_API_EXAM + "/examchoicesadd/"+id,Adddata,
  {
    headers:{
      id
    }
});
  export const examChoiceschange = async (id,payload) =>
  await axios.post(process.env.REACT_APP_API_EXAM + "/examChoiceschange/"+id,payload,
  {
    headers:{
      id
    }
});
  export const examChoicesdelete = async (id,deletedata) =>
  await axios.post(process.env.REACT_APP_API_EXAM + "/examChoicesdelete/"+id,deletedata,
  {
    headers:{
      id
    }
});
  export const examReset = async (id,data) =>
  await axios.post(process.env.REACT_APP_API_EXAM + "/examReset/"+id,data,
  {
    headers:{
      id
    }
});
  export const examHeadChange = async (id,payload) =>
  await axios.post(process.env.REACT_APP_API_EXAM + "/examHeadChange/"+id,payload,
  {
    headers:{
      payload
    }
});

  export const CorrectAnswer = async (id,payload) =>
  await axios.post(process.env.REACT_APP_API_EXAM + "/CorrectAnswer/"+id,payload,
  {
    headers:{
      id
    }
});
  export const EasyRecord = async (id,payload) =>
  await axios.post(process.env.REACT_APP_API_EXAM + "/EasyRecord/"+id,payload,
  {
    
  });
  export const HardRecord = async (id,payload) =>
  await axios.post(process.env.REACT_APP_API_EXAM + "/HardRecord/"+id,payload,
  {
    
  });
  export const CountStamp = async (id,payload) =>
  await axios.post(process.env.REACT_APP_API_EXAM + "/CountStamp/"+id,payload,
  {
    
  });
  export const removeExam = async (id) =>
  await axios.delete(process.env.REACT_APP_API_EXAM + "/removeExam/"+id,
  {
    
  });