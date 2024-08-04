
import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./userSlice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
