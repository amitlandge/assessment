import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isDelete: false,
  isLoading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.users = action.payload;
    },
    userDelete: (state, action) => {
      state.isDelete = action.payload;
    },
    clearDelete: (state) => {
      state.isDelete = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export default userSlice;
export const { getUser, userDelete, clearDelete, setLoading, clearLoading } =
  userSlice.actions;
