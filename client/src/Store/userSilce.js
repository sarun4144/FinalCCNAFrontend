import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 value: "Hello Sarun4144 55555",
 user:[],
 Loading:false
};

export const userSlice = createSlice({
  name:'userStore',
  initialState:initialState,
  reducers:{
        login:(state,action)=>{
            state.value="Hello kub"
            state.user = action.payload
            state.Loading = true
        },
        logout:(state)=>{
            state.value="logout kub"
            state.Loading = false
        },
  },
  
});
export const {login,logout} = userSlice.actions;
export default userSlice.reducer;
