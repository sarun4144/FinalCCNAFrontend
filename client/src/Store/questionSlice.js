import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  question: []
};

export const questionSlice = createSlice({
  name: 'questionStore',
  initialState: initialState,
  reducers: {
    markin: (state, action) => {
      state.currentquestion = action.payload
    },
    markout: (state, action) => {
      state.currentquestion = action.payload
      
    },
  },

});
export const { markin, markout } = questionSlice.actions;
export default questionSlice.reducer;
