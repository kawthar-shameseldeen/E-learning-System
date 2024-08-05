
import { createSlice } from "@reduxjs/toolkit";

const enrollSlice = createSlice({
  name: "enrollments",
  initialState: {
    enrollLoading: false,
    enrollSuccess: null,
    enrollError: null,
    enrolledClasses: [],
  },
  reducers: {
    fetchingEnroll: (state) => {
      state.enrollLoading = true;
      state.enrollError = null;
    },
    setEnrollSuccess: (state, action) => {
      state.enrollSuccess = action.payload;
      state.enrollLoading = false;
    },
    setEnrollError: (state, action) => {
      state.enrollError = action.payload;
      state.enrollLoading = false;
    },
    setEnrolledClasses: (state, action) => {
      state.enrolledClasses = action.payload;
      state.enrollLoading = false;
    },
  },
});

export const {
  fetchingEnroll,
  setEnrollSuccess,
  setEnrollError,
  setEnrolledClasses,
  fetchEnrolledClasses,
  enrollInClass,
} = enrollSlice.actions;
export const enrollSelector = (state) => state.enrollments;
export const enrollReducer = enrollSlice.reducer;
