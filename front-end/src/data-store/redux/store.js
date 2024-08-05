import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./userSlice";
import { classReducer } from "./classSlice";
import { enrollReducer } from "./enrollSlice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    users: usersReducer,
    classes: classReducer,
    enrollments: enrollReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
