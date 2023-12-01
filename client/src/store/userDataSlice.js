import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    value: null,
    isLoggedIn: false,
  },
  reducers: {
    updateUserData: (state, action) => {
      state.value = action.payload;
    },
    checkLoggedIn: (state) => {
      if (state.value) {
        state.isLoggedIn = true;
      }
    },
    logout: (state) => {
      state.value = null;
      state.isLoggedIn = false;
    },
  },
});

export const { updateUserData, checkLoggedIn, logout } = userDataSlice.actions;

export default userDataSlice.reducer;
