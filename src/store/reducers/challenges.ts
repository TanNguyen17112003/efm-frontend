import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from 'src/config/axios.config';
import { getUserInAsyncStorage } from 'src/helper';

const initialState: {
  id: string;
  challenge: Challenge | null;
  challenges: Challenge[];
  friendChallenges: Challenge[];
  contribution: number;
  loading: boolean;
  error: string;
} = {
  id: '',
  challenge: null,
  challenges: [],
  friendChallenges: [],
  contribution: 0,
  loading: false,
  error: ''
};

export const getChallenges = createAsyncThunk(
  'challenge/getChallenges',
  async (_, { rejectWithValue }) => {
    try {
      const user = await getUserInAsyncStorage();
      if (!user || !user.token) {
        throw new Error('User token not found');
      }
      const response = await axiosInstance.get('/challenge/friends/attended', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch challenges');
    }
  }
);

export const getFriendChallenges = createAsyncThunk(
  'challenge/getFriendChallenges',
  async (_, { rejectWithValue }) => {
    try {
      const user = await getUserInAsyncStorage();
      if (!user || !user.token) {
        throw new Error('User token not found');
      }
      const response = await axiosInstance.get('/challenge/friends/all', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch challenges');
    }
  }
);

export const getChallengeById = createAsyncThunk(
  'challenge/getChallengeById',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const user = await getUserInAsyncStorage();
      if (!user || !user.token) {
        throw new Error('User token not found');
      }
      const response = await axiosInstance.get(`/challenge/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      return response.data.challenge;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch challenge');
    }
  }
);

export const attendChallenge = createAsyncThunk(
  'challenge/attendChallenge',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const user = await getUserInAsyncStorage();
      if (!user || !user.token) {
        throw new Error('User token not found');
      }
      const response = await axiosInstance.post(
        `/challenge/${id}/attend`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch challenge');
    }
  }
);

export const getContribution = createAsyncThunk(
  'challenge/getContribution',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const user = await getUserInAsyncStorage();
      if (!user || !user.token) {
        throw new Error('User token not found');
      }
      const response = await axiosInstance.get(`/challenge/${id}/contribute`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
    return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message || 'Failed to fetch challenge');
    }
  }
);

export const contributeToChallenge = createAsyncThunk(
  'challenge/contributeToChallenge',
  async ({ id, amount }: { id: string; amount: number }, { rejectWithValue }) => {
    try {
      const user = await getUserInAsyncStorage();
      if (!user || !user.token) {
        throw new Error('User token not found');
      }
      const response = await axiosInstance.post(
        `/challenge/${id}/contribute`,
        { amount: amount },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch challenge');
    }
  }
);

export const createChallenge = createAsyncThunk(
  'challenge/createChallenge',
  async (
    {
      category,
      name,
      description,
      date,
      target,
      current
    }: {
      category: string;
      name: string;
      description: string;
      date: Date;
      target: number;
      current: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const user = await getUserInAsyncStorage();
      if (!user || !user.token) {
        throw new Error('User token not found');
      }
      const response = await axiosInstance.post(
        '/challenge',
        {
          category,
          name,
          description,
          date,
          target,
          current
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      return response.data.challenge;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create challenge');
    }
  }
);

const challengesSlice = createSlice({
  name: 'challenge',
  initialState: initialState,
  reducers: {
    resetChallenges: (state) => {
      return { ...state, ...initialState };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getChallenges.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getChallenges.fulfilled, (state, action) => {
      state.loading = false;
      state.challenges = action.payload;
    });
    builder.addCase(getChallenges.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getFriendChallenges.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFriendChallenges.fulfilled, (state, action) => {
      state.loading = false;
      state.friendChallenges = action.payload;
    });
    builder.addCase(getFriendChallenges.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getChallengeById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getChallengeById.fulfilled, (state, action) => {
      state.loading = false;
      state.challenge = action.payload;
      state.id = action.payload?.id;
    });
    builder.addCase(getChallengeById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(createChallenge.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createChallenge.fulfilled, (state: any, action: PayloadAction<any>) => {
      state.loading = false;
      state.challenges.push(action.payload);
      console.log(action.payload);
    });
    builder.addCase(createChallenge.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getContribution.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getContribution.fulfilled, (state: any, action: PayloadAction<any>) => {
      state.loading = false;
      state.contribution = action.payload != null ? action.payload.amount : 0;
    });
    builder.addCase(getContribution.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});
export const { resetChallenges } = challengesSlice.actions;

export const challengesReducer = challengesSlice.reducer;
