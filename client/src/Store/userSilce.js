import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 user:[],

}

export const userSlice = createSlice({
  name:'userStore',
  initialState:initialState,
  reducers:{
        login:(state,action)=>{
            state.user = action.payload
        },  
        logout:(state,action)=>{
            state.user = action.payload
            localStorage.clear();
        },
  },
  
});
export const {login,logout} = userSlice.actions;
export default userSlice.reducer;
