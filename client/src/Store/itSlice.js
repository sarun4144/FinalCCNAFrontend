import { createSlice } from '@reduxjs/toolkit'
const initialState = {
 value: "It Store",
 it:[],
 Loading:false
};

export const itSlice = createSlice({
  name:'itStore',
  initialState:initialState,
  reducers:{
       
  },
  
});
export default itSlice.reducer;
