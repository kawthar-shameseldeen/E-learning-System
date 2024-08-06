import { createSlice } from '@reduxjs/toolkit';

const dropSlice = createSlice({
  name: 'drops',
  initialState: {
    dropLoading: false,
    dropSuccess: null,
    dropError: null,
    dropRequests: [],
  },
  reducers: {
    fetchingDropRequests: (state) => {
      state.dropLoading = true;
      state.dropError = null;
    },
    setDropRequests: (state, action) => {
      state.dropRequests = action.payload;
      state.dropLoading = false;
    },
    droppingCourse: (state) => {
      state.dropLoading = true;
      state.dropError = null;
    },
    dropCourseSuccess: (state, action) => {
      state.dropSuccess = action.payload;
      state.dropLoading = false;
    },
    dropCourseError: (state, action) => {
      state.dropError = action.payload;
      state.dropLoading = false;
    },
    clearDropState: (state) => {
      state.dropLoading = false;
      state.dropSuccess = null;
      state.dropError = null;
    },
  },
});

export const {
  fetchingDropRequests,
  setDropRequests,
  droppingCourse,
  dropCourseSuccess,
  dropCourseError,
  clearDropState,
} = dropSlice.actions;

export const dropSelector = (state) => state.drops;

export const dropReducer = dropSlice.reducer;
