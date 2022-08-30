import { configureStore } from "@reduxjs/toolkit";
import userSilce from "./userSilce";
import itSlice from "./itSlice";

export const store = configureStore({
    reducer:{
        userStore:userSilce,
        It:itSlice
    }

})