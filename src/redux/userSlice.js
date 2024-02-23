import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    error: null,
    token: null,
  },
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload.rest;
      state.error = null;
      state.token = action.payload.token;
    },
    signInFailure: (state, action) => {
      state.currentUser = null;
      state.error = action.payload;
      state.token = null;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signInSuccess, signInFailure, signOut } = userSlice.actions;

export default userSlice.reducer;
