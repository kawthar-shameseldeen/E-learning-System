import { createSlice } from "@reduxjs/toolkit";

const classSlice = createSlice({
  name: "classes",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchingClasses: (state) => {
      state.loading = true;
      state.error = null;
    },
    setClasses: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchingClasses, setClasses, setError } = classSlice.actions;
export const classSelector = (state) => state.classes;
export const classReducer = classSlice.reducer;
