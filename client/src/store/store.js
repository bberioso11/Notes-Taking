import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./userDataSlice";
export const userData = configureStore({
  reducer: {
    userData: userDataSlice,
  },
});
