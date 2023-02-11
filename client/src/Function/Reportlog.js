import axios from 'axios'


export const Reportadd = async (id,value) =>
  await axios.post(process.env.REACT_APP_API_PERSON + "/Reportadd/" + id,value,
    {

    });

export const Rerecord = async (id,value) =>
  await axios.post(process.env.REACT_APP_API_PERSON + "/Rerecord/" + id,value,
    {

    });
export const Rerecordlist = async (id) =>
  await axios.post(process.env.REACT_APP_API_PERSON + "/Rerecordlist/" + id,
    {

    });
export const Repotlist = async () =>
  await axios.get(process.env.REACT_APP_API_PERSON + "/Repotlist" ,
    {

    });