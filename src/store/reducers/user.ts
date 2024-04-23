import { Config } from 'src/config/api.config';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type UserRespone = {
  email: string;
  _id: string;
  name: string;
};

type FetchError = {
  message: any;
};
const initialState = {
  _id: '',
  email: '',
  name: '',
  loading: false,
  error: ''
};

export const getUser = createAsyncThunk<UserRespone, any, { rejectValue: FetchError }>(
  'signin',
  async (params: { token: string; email: string }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${params.token}`
        }
      };
      const url = 'https://efm-backend-production-bf79.up.railway.app/api/user/profile';
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.log(error);
      return {
        message: 'error'
      };
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    _id: '',
    email: '',
    name: '',
    loading: false,
    error: ''
  },
  reducers: {
    logout: (state) => {
      return { ...state, ...initialState };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.email = payload.email || '';
        state.name = payload.name;
        state._id = payload._id || '';
      }),
      builder.addCase(getUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || '';
      });
  }
});

export const { logout } = userSlice.actions;
export const UserReducers = userSlice.reducer;
