import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./userSlice";
import { classReducer } from "./classSlice";
import { enrollReducer } from "./enrollSlice";
import { enrolledClassesReducer } from "./enrolledSlice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    users: usersReducer,
    classes: classReducer,
    enrollments: enrollReducer,
    enrollledClasses: enrolledClassesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
