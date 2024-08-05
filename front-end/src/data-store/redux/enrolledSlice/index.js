import { createSlice } from "@reduxjs/toolkit";

const enrolledClassesSlice = createSlice({
  name: "enrolledClasses",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchingEnrolledClasses: (state) => {
      state.loading = true;
      state.error = null;
    },
    setEnrolledClasses: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    setEnrolledClassesError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchingEnrolledClasses,
  setEnrolledClasses,
  setEnrolledClassesError,
} = enrolledClassesSlice.actions;
export const enrolledClassesSelector = (state) => state.enrolledClasses;
export const enrolledClassesReducer = enrolledClassesSlice.reducer;
