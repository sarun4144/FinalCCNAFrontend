import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 text: " ",
 role:"",
 token:" ",
 user:[],
 currentuser:[],

};

export const userSlice = createSlice({
  name:'userStore',
  initialState:initialState,
  reducers:{
        login:(state,action)=>{
            state.user = action.payload
            state.currentuser = action.payload
        },
        logout:(state)=>{
            state.text="Logout user"
        },
        Currentuser:(state,action)=>{
          state.currentuser = action.payload
      },
  },
  
});
export const {login,logout,Currentuser} = userSlice.actions;
export default userSlice.reducer;
