import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getGoalById } from '@services';
import axiosInstance from 'src/config/axios.config';
import { getUserInAsyncStorage } from 'src/helper';

const initialState: {
  currentGoal: any;
  goals: Goal[];
  loading: boolean;
  error: string;
} = {
  currentGoal: null,
  goals: [],
  loading: false,
  error: ''
};

export const getAllgoals = createAsyncThunk('goals', async (_, { rejectWithValue }) => {
  try {
    const user = await getUserInAsyncStorage();
    if (!user || !user.token) {
      throw new Error('User token not found');
    }
    const response = await axiosInstance.get('/goal', {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
    return response.data.sample;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch goals');
  }
});

export const getgoalById = createAsyncThunk(
  'goals/getById',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const user = await getUserInAsyncStorage();
      if (!user || !user.token) {
        throw new Error('User token not found');
      }
      const response = await axiosInstance.get(`/goal/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch goal');
    }
  }
);

export const configGoalById = createAsyncThunk(
  'goals/configById',
  async (
    {
      id,
      date,
      target,
      current
    }: {
      id: string;
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
      const response = await axiosInstance.put(
        `/goal/${id}`,
        {
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
      return response.data.goal;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to configure goal');
    }
  }
);

// Define thunk for creating goal
export const createGoal = createAsyncThunk(
  'goals/create',
  async (
    {
      category,
      title,
      date,
      target,
      current
    }: {
      category: string;
      title: string;
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
        '/goal',
        {
          category,
          title,
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
      return response.data.goal;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create goal');
    }
  }
);

export const deleteGoal = createAsyncThunk(
  'goals/delete',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const user = await getUserInAsyncStorage();
      if (!user || !user.token) {
        throw new Error('User token not found');
      }
      const response = await axiosInstance.delete(`/goal/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      return response.data.sample;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete goal');
    }
  }
);

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    resetGoals: (state) => {
      return { ...state, ...initialState };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllgoals.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllgoals.fulfilled, (state, action) => {
      state.loading = false;
      state.goals = action.payload ? action.payload : [];
    });
    builder.addCase(getAllgoals.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getgoalById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getgoalById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentGoal = action.payload;
    });
    builder.addCase(getgoalById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(configGoalById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(configGoalById.fulfilled, (state: any, action: PayloadAction<any>) => {
      state.loading = false;
      const updatedgoal = action.payload;
      const index = state.goals.findIndex((goal: Goal) => goal._id === updatedgoal._id);
      if (index !== -1 && state && state.goals) {
        state.goals[index] = updatedgoal;
      }
    });
    builder.addCase(configGoalById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(createGoal.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createGoal.fulfilled, (state: any, action: PayloadAction<any>) => {
      state.loading = false;
      state.goals.push(action.payload);
      console.log(action.payload);
    });
    builder.addCase(createGoal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(deleteGoal.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteGoal.fulfilled, (state: any, action: PayloadAction<any>) => {
      state.loading = false;
      if (state.goals.length == 1) {
        state.goals = [];
      }
    });
    builder.addCase(deleteGoal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});
export const { resetGoals } = goalsSlice.actions;

export const goalsReducer = goalsSlice.reducer;
