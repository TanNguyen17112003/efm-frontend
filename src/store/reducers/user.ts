import { Config } from 'src/config/api.config';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from 'src/config/axios.config';
import { getUserInAsyncStorage, storeAsyncStorage } from 'src/helper';
import { register } from '@services';

type UserRespone = {
  email: string;
  _id: string;
  name: string;
};

type FetchError = {
  message: any;
};
const initialState = {
  id: '',
  email: '',
  friends: [],
  requests: [],
  myRequests: [],
  allUsers: [],
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
      const url = `${Config.API_URL}user/profile`;
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      return {
        message: 'error'
      };
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (
    { email, password, name }: { email: string; password: string; name: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post('/user/signup', {
        email,
        password,
        name
      });
      storeAsyncStorage('user', {
        token: response.data.userInfo.token,
        email: response.data.userInfo.info.email,
        name: response.data.userInfo.info.name
      });
      return response.data.userInfo;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to register');
    }
  }
);

export const getUserInfo = createAsyncThunk('user/infor', async (_, { rejectWithValue }) => {
  try {
    const user = await getUserInAsyncStorage();
    if (!user || !user.token) {
      throw new Error('User token not found');
    }
    const response = await axiosInstance.get('/user/profile', {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to register');
  }
});

export const getAllUsers = createAsyncThunk('user/all', async (_, { rejectWithValue }) => {
  try {
    const user = await getUserInAsyncStorage();
    if (!user || !user.token) {
      throw new Error('User token not found');
    }
    const response = await axiosInstance.get('/user/all', {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to register');
  }
});

export const sendFriendRequest = createAsyncThunk(
  'user/sendRequest',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const user = await getUserInAsyncStorage();
      if (!user || !user.token) {
        throw new Error('User token not found');
      }
      const response = await axiosInstance.post(
        `/user/request/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to register');
    }
  }
);

export const acceptFriendRequest = createAsyncThunk(
  'user/acceptRequest',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const user = await getUserInAsyncStorage();
      if (!user || !user.token) {
        throw new Error('User token not found');
      }
      const response = await axiosInstance.put(
        `/user/request/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to register');
    }
  }
);

export const rejectRequest = createAsyncThunk(
  'user/rejectRequest',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const user = await getUserInAsyncStorage();
      if (!user || !user.token) {
        throw new Error('User token not found');
      }
      const response = await axiosInstance.put(
        `/user/request/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to register');
    }
  }
);

export const getAllRequests = createAsyncThunk(
  'user/allRequests',
  async (_, { rejectWithValue }) => {
    try {
      const user = await getUserInAsyncStorage();
      if (!user || !user.token) {
        throw new Error('User token not found');
      }
      const response = await axiosInstance.get('/user/request', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to register');
    }
  }
);

export const getAllFriends = createAsyncThunk('user/allFriends', async (_, { rejectWithValue }) => {
  try {
    const user = await getUserInAsyncStorage();
    if (!user || !user.token) {
      throw new Error('User token not found');
    }
    const response = await axiosInstance.get('/user/friends', {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to register');
  }
});

export const getAllMyRequests = createAsyncThunk(
  'user/allMyRequest',
  async (_, { rejectWithValue }) => {
    try {
      const user = await getUserInAsyncStorage();
      if (!user || !user.token) {
        throw new Error('User token not found');
      }
      const response = await axiosInstance.get('user/my-request', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to register');
    }
  }
);

export const updateName = createAsyncThunk(
  'user/updateName',
  async ({ name }: { name: string }, { rejectWithValue }) => {
    try {
      const user = await getUserInAsyncStorage();
      if (!user || !user.token) {
        throw new Error('User token not found');
      }
      const response = await axiosInstance.put(
        'user/update-name',
        { name },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      return response.data.user.name;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to register');
    }
  }
);

export const changePasswords = createAsyncThunk(
  'user/changePasswords',
  async (
    { currentPassword, newPassword }: { currentPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const user = await getUserInAsyncStorage();
      if (!user || !user.token) {
        throw new Error('User token not found');
      }
      const response = await axiosInstance.put(
        'user/update-password',
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to register');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    email: '',
    name: '',
    loading: false,
    error: '',
    friends: [],
    requests: [],
    myRequests: [],
    allUsers: []
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
        state.id = payload._id || '';
      }),
      builder.addCase(getUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || '';
      });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.email = payload.info.email || '';
        state.name = payload.info.name;
        state.id = payload.info._id || '';
      }),
      builder.addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state: any, action: PayloadAction<any>) => {
      state.loading = false;
      state.allUsers = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getAllRequests.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllRequests.fulfilled, (state: any, action: PayloadAction<any>) => {
      state.loading = false;
      state.requests = action.payload;
    });
    builder.addCase(getAllRequests.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getAllMyRequests.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllMyRequests.fulfilled, (state: any, action: PayloadAction<any>) => {
      state.loading = false;
      state.myRequests = action.payload;
    });
    builder.addCase(getAllMyRequests.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getAllFriends.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllFriends.fulfilled, (state: any, action: PayloadAction<any>) => {
      state.loading = false;
      state.friends = action.payload;
    });
    builder.addCase(getAllFriends.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(updateName.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateName.fulfilled, (state: any, action: PayloadAction<any>) => {
      state.loading = false;
      state.name = action.payload;
    });
    builder.addCase(updateName.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export const { logout } = userSlice.actions;
export const UserReducers = userSlice.reducer;
