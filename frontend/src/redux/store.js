import { configureStore } from "@reduxjs/toolkit";
import roleSlice from "./reducers/role";
import userSlice from "./reducers/user";
const store = configureStore({
  reducer: {
    [roleSlice.name]: roleSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
});

export default store;
