import { configureStore } from "@reduxjs/toolkit";
import userSilce from "./userSilce";
import examSlice from "./examSilce";
import questionSlice from "./questionSlice";

export const store = configureStore({
    reducer:{
        userStore:userSilce,
        examStore:examSlice,
        questionStore:questionSlice
    }

})