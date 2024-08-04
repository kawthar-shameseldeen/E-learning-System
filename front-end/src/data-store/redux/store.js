import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./userSlice";
import { classReducer } from "./classSlice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    users: usersReducer,
    classes: classReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
