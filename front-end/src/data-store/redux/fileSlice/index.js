import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: {}, // Changed to an object to hold files by classId
  loading: false,
  error: null,
};

const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setFilesLoading(state, action) {
      state.loading = action.payload;
    },
    setFiles(state, action) {
      const { classId, files } = action.payload;
      state.files[classId] = files;
    },
    setFilesError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setFilesLoading, setFiles, setFilesError } = fileSlice.actions;

export const filesSelector = (state) => state.files;

export const fileReducer = fileSlice.reducer;
