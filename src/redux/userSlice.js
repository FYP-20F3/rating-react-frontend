import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    error: null,
    token: null,
    role: null,
  },
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload.rest;
      state.error = null;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    signInFailure: (state, action) => {
      state.currentUser = null;
      state.error = action.payload;
      state.token = null;
      state.role = null;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.token = null;
      state.role = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signInSuccess, signInFailure, signOut } = userSlice.actions;

export default userSlice.reducer;
