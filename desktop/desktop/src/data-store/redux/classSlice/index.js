import { createSlice } from '@reduxjs/toolkit';

const classSlice = createSlice({
  name: 'classes',
  initialState: {
    availableCourses: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchingCourses: (state) => {
      state.loading = true;
      state.error = null;
    },
    setAvailableCourses: (state, action) => {
      state.availableCourses = action.payload;
      state.loading = false;
    },
    removeCourse: (state, action) => {
      state.availableCourses = state.availableCourses.filter(
        (course) => course._id !== action.payload
      );
    },
    setCoursesError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addCourse: (state, action) => {
      state.availableCourses.push(action.payload);
    },
  },
});

export const {
  fetchingCourses,
  setAvailableCourses,
  removeCourse,
  setCoursesError,
  addCourse,
} = classSlice.actions;

export const coursesSelector = (state) => state.classes;

export const classReducer = classSlice.reducer;
