import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './userSlice';
import { classReducer } from './classSlice';
import { fileReducer } from './fileSlice';
import { dropReducer } from './dropSlice';

import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    users: usersReducer,
    classes: classReducer,
    files: fileReducer,
    drops: dropReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
