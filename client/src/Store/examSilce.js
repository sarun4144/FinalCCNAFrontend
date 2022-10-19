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
    checkout:(state,action)=>{
      state.exam = action.payload
      localStorage.removeItem("examid")
      localStorage.removeItem("catid")
  },
  },
  
});
export const {checkin,checkout} = examSlice.actions;
export default examSlice.reducer;
