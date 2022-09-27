import { createSlice } from '@reduxjs/toolkit'
const initialState = {
 exam:[]
};

export const examSlice = createSlice({
  name:'examStore',
  initialState:initialState,
  reducers:{
    checkin:(state,action)=>{
      state.exam = action.payload
  },
  },
  
});
export const {checkin} = examSlice.actions;
export default examSlice.reducer;
