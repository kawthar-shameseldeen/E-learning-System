import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  files: [],
  loading: false,
  error: null,
};

const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    uploadFileStart(state) {
      state.loading = true;
      state.error = null;
    },
    uploadFileSuccess(state, action) {
      state.loading = false;
      state.files.push(action.payload);
    },
    uploadFileFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchFilesByClassStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFilesByClassSuccess(state, action) {
      state.loading = false;
      state.files = action.payload;
    },
    fetchFilesByClassFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  uploadFileStart,
  uploadFileSuccess,
  uploadFileFailure,
  fetchFilesByClassStart,
  fetchFilesByClassSuccess,
  fetchFilesByClassFailure,
} = fileSlice.actions;

export const filesSelector = (state) => state.files;
export const fileReducer = fileSlice.reducer;
