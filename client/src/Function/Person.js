import axios from 'axios'

export const listUser = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API + "/person",
    {
      headers: {
        authtoken
      }
    });
export const removeUser = async (authtoken, id) =>
  await axios.delete(process.env.REACT_APP_API + "/person/" + id,
    {
      headers: {
        authtoken
      }
    });
export const changeStatus = async (authtoken, value) =>
  await axios.post(process.env.REACT_APP_API + "/change-status", value,
    {
      headers: {
        authtoken
      }
    });
export const changeRole = async (authtoken, value) =>
  await axios.post(process.env.REACT_APP_API + "/change-role", value,
    {
      headers: {
        authtoken
      }
    });
export const changePassword = async (authtoken, id, value) =>
  await axios.put(process.env.REACT_APP_API + "/person/" + id, value,
    {
      headers: {
        authtoken
      }
    });