
import axios from 'axios'

export const categoryAdd = async (authtoken, value) =>
  await axios.post(process.env.REACT_APP_API_CATEGORY + "/category", value, {
    headers: {
      authtoken
    }
  });

export const listCategory = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API_CATEGORY + "/category", {
    headers: {
      authtoken
    }
  });
export const readCategory = async (authtoken,id) =>
  await axios.get(process.env.REACT_APP_API_CATEGORY + "/category/"+id,{
    headers: {
      authtoken
    }
  });
export const removeCategory = async (authtoken, id) =>
  await axios.delete(process.env.REACT_APP_API_CATEGORY + "/category/" + id,
    {
      headers: {
        authtoken
      }
    });