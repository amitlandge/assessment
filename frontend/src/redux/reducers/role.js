import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  roles: [],
  isDelete: false,
  singleRole: null,
  isLoading: false,
};
const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    getAllRole: (state, action) => {
      state.roles = action.payload;
    },
    deleteRole: (state, action) => {
      state.isDelete = action.payload;
    },
    clearDelete: (state) => {
      state.isDelete = false;
    },
    singleRole: (state, action) => {
      state.singleRole = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export default roleSlice;
export const {
  getAllRole,
  deleteRole,
  clearDelete,
  singleRole,
  setLoading,
  clearLoading,
} = roleSlice.actions;
