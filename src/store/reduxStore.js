import { configureStore } from "@reduxjs/toolkit";
import respDataSlice from "./apiData";

export default configureStore({
  reducer: {
    respdata: respDataSlice,
  },
});
