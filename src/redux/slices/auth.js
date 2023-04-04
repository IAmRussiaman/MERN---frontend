import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchUserData = createAsyncThunk('/auth/fetchUserData', async (params) => {
  const { data } = await axios.post('auth/login', params);
  return data;
});
export const fetchAuthMe = createAsyncThunk('/auth/fetchAuthMe', async () => {
  const { data } = await axios.get('me');
  return data;
});
export const fetchSingUp = createAsyncThunk('/register', async (params) => {
  const { data } = await axios.post('register', params);
  return data;
});
const initialState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = 'loading';
    },
  },
  extraReducers: {
    [fetchUserData.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchUserData.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'authorized';
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = 'failed authorization';
      state.data = null;
    },
    [fetchSingUp.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchSingUp.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'registred';
    },
    [fetchSingUp.rejected]: (state) => {
      state.status = 'failed registration';
      state.data = null;
    },
  },
});
export const { logout } = authSlice.actions;
export const isAuthBoolean = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
