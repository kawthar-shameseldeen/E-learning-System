import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./userSlice";
import { classReducer } from "./classSlice";
import { enrollReducer } from "./enrollSlice";
import { dropReducer } from "./dropSlice";
import { fileReducer } from "./fileSlice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    users: usersReducer,
    classes: classReducer,
    enrollments: enrollReducer,
    drops: dropReducer,
    files: fileReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
