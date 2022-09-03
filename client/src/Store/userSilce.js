import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 text: " ",
 role:"",
 token:" ",
 user:[]

};

export const userSlice = createSlice({
  name:'userStore',
  initialState:initialState,
  reducers:{
        login:(state,action)=>{
            state.user = action.payload
        },
        logout:(state)=>{
            state.text="Logout user"
        },
  },
  
});
export const {login,logout} = userSlice.actions;
export default userSlice.reducer;
