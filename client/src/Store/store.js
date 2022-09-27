import { configureStore } from "@reduxjs/toolkit";
import userSilce from "./userSilce";
import examSlice from "./examSilce";

export const store = configureStore({
    reducer:{
        userStore:userSilce,
        examStore:examSlice
    }

})