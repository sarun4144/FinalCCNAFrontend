import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 text: "Hello Sarun4144 55555",
 user:[],

};

export const userSlice = createSlice({
  name:'userStore',
  initialState:initialState,
  reducers:{
        login:(state,action)=>{
            state.text="Login user"
            state.user = action.payload
            
        },
        logout:(state)=>{
            state.text="Logout user"
        },
  },
  
});
export const {Logins,Logouts} = userSlice.actions;
export default userSlice.reducer;
