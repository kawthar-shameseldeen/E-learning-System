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
    approvingDropRequest: (state) => {
      state.dropLoading = true;
      state.dropError = null;
    },
    rejectingDropRequest: (state) => {
      state.dropLoading = true;
      state.dropError = null;
    },
    dropRequestApproved: (state, action) => {
      state.dropRequests = state.dropRequests.filter(
        (request) => request._id !== action.payload
      );
      state.dropLoading = false;
    },
    dropRequestRejected: (state, action) => {
      state.dropRequests = state.dropRequests.filter(
        (request) => request._id !== action.payload
      );
      state.dropLoading = false;
    },
    dropRequestError: (state, action) => {
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
  approvingDropRequest,
  rejectingDropRequest,
  dropRequestApproved,
  dropRequestRejected,
  dropRequestError,
  clearDropState,
} = dropSlice.actions;

export const dropSelector = (state) => state.drops;

export const dropReducer = dropSlice.reducer;
