import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  list: [],
  error: null,
  user: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchingUsers: (state) => {
      state.loading = true;
    },
    loadUsers: (state, action) => {
      const { payload } = action;
      state.loading = false;
      state.list = payload;
    },
    errorOccured: (state, action) => {
      const { payload } = action;
      state.loading = false;
      state.error = payload;
    },
    registerUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    registerUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loadUsers,
  fetchingUsers,
  errorOccured,
  registerUserSuccess,
  registerUserStart,
  registerUserFail,
} = usersSlice.actions;

export const usersSliceSelector = (state) => state.users;

export const usersReducer = usersSlice.reducer;
