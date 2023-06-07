import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    logout : (state) =>{
      state.currentUser = null
      state.isFetching = false
      state.error = false
    },
    registerStart : (state) => {
      state.isFetching = true;
      state.error = false
    },
    registerSuccess : (state, action) =>{
      state.currentUser = action.payload 
      state.isFetching = false;
    },
    registerFailure :(state) => {
      state.isFetching = false
      state.error = true;
    },
    loginStart: (state) => {
      state.error = false
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, registerStart, 
registerSuccess, registerFailure, logout} = userSlice.actions;
export default userSlice.reducer;