
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const registerUser = createAsyncThunk(
  "users/registerUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3030/api/users/register",
        { name, email, password }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { loadUsers, fetchingUsers, errorOccured } = usersSlice.actions;

export const usersSliceSelector = (state) => state.users;

export default usersSlice.reducer;

export const usersReducer = usersSlice.reducer;
