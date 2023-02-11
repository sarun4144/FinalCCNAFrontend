import axios from 'axios'

export const listUser = async () =>
  await axios.get(process.env.REACT_APP_API_PERSON + "/person",
    {
      
    });
export const reads = async (authtoken,id) =>
  await axios.get(process.env.REACT_APP_API_PERSON + "/reads/"+id,
    {
      headers: {
        authtoken
      }
    });
export const removeUser = async (authtoken, id) =>
  await axios.delete(process.env.REACT_APP_API_PERSON + "/person/" + id,
    {
      headers: {
        authtoken
      }
    });
export const changeStatus = async (authtoken, value) =>
  await axios.post(process.env.REACT_APP_API_PERSON + "/change-status", value,
    {
      headers: {
        authtoken
      }
    });
export const changeRole = async (authtoken, value) =>
  await axios.post(process.env.REACT_APP_API_PERSON + "/change-role", value,
    {
      headers: {
        authtoken
      }
    });
export const changePassword = async (authtoken, id, value) =>
  await axios.put(process.env.REACT_APP_API_PERSON + "/person/" + id, value,
    {
      headers: {
        authtoken
      }
    });
export const Easylog = async (id) =>
  await axios.post(process.env.REACT_APP_API_PERSON + "/Easylog/" + id,
    {

    });
export const Hardlog = async (id) =>
  await axios.post(process.env.REACT_APP_API_PERSON + "/Hardlog/" + id,
    {

    });
export const HardlogS = async (id,value) =>
  await axios.post(process.env.REACT_APP_API_PERSON + "/HardlogS/" + id,value,
    {

    });
export const EasylogS = async (id,value) =>
  await axios.post(process.env.REACT_APP_API_PERSON + "/EasylogS/" + id,value,
    {

    });
export const ChangeName = async (authtoken, id, value) =>
  await axios.put(process.env.REACT_APP_API_PERSON + "/ChangeName/" + id, value,
    {
      headers: {
        authtoken
      }
    });
    export const Catrecord = async (value) =>
  await axios.post(process.env.REACT_APP_API_PERSON + "/Catrecord" ,value,
    {

    });