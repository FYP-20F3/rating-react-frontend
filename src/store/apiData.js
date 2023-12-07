import { createSlice } from "@reduxjs/toolkit";

export const respDataSlice = createSlice({
  name: "data",
  initialState: {
    respdata: [],
  },
  reducers: {
    getData: (state, action) => {
      state.respdata = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getData } = respDataSlice.actions;

export default respDataSlice.reducer;
