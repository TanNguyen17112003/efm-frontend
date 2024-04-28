import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from 'src/config/axios.config';
import { getUserInAsyncStorage } from 'src/helper';

const initialState: {
  activities: Activity[];
  loading: boolean;
  error: string;
} = {
  activities: [],
  loading: false,
  error: ''
};

export const getAllActivities = createAsyncThunk(
  'activities/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const user = await getUserInAsyncStorage();
      if (!user || !user.token) {
        throw new Error('User token not found');
      }
      const response = await axiosInstance.get('/activity', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      return response.data.sample;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch activities');
    }
  }
);

export const getActivityById = createAsyncThunk(
  'activities/getById',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const user = await getUserInAsyncStorage();
      if (!user || !user.token) {
        throw new Error('User token not found');
      }
      const response = await axiosInstance.get(`/activity/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      return response.data.sample;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch activity');
    }
  }
);

export const configActivityById = createAsyncThunk(
  'activities/configById',
  async (
    {
      id,
      category,
      title,
      date,
      target,
      current
    }: {
      id: string;
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
      const response = await axiosInstance.put(
        `/activity/${id}`,
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
      return response.data.activity;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to configure activity');
    }
  }
);

// Define thunk for creating activity
export const createActivity = createAsyncThunk(
  'activities/create',
  async (
    {
      type,
      category,
      content,
      createdAt,
      amount
    }: {
      type: string;
      category: string;
      content: string;
      createdAt: Date;
      amount: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const user = await getUserInAsyncStorage();
      if (!user || !user.token) {
        throw new Error('User token not found');
      }
      const response = await axiosInstance.post(
        '/activity',
        {
          type,
          category,
          content,
          createdAt,
          amount
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      console.log(response.data);
      return response.data.activity;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create activity');
    }
  }
);

export const deleteActivity = createAsyncThunk(
  'activities/delete',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const user = await getUserInAsyncStorage();
      if (!user || !user.token) {
        throw new Error('User token not found');
      }
      const response = await axiosInstance.delete(`/activity/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      return response.data.sample;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete activity');
    }
  }
);

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllActivities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllActivities.fulfilled, (state, action) => {
      state.loading = false;
      state.activities = action.payload;
    });
    builder.addCase(getAllActivities.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(configActivityById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(configActivityById.fulfilled, (state: any, action: PayloadAction<any>) => {
      state.loading = false;
      const updatedActivity = action.payload;
      const index = state.activities.findIndex(
        (activity: Activity) => activity._id === updatedActivity._id
      );
      if (index !== -1 && state && state.activities) {
        state.activities[index] = updatedActivity;
      }
    });
    builder.addCase(configActivityById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(createActivity.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createActivity.fulfilled, (state: any, action: PayloadAction<any>) => {
      state.loading = false;
      state.activities.push(action.payload);
      console.log(action.payload);
    });
    builder.addCase(createActivity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(deleteActivity.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteActivity.fulfilled, (state: any, action: PayloadAction<any>) => {
      state.loading = false;
      // state.activities = state.activities.filter(
      //   (activity: Activity) => activity._id !== action.payload._id
      // );
    });
    builder.addCase(deleteActivity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export const activitiesActions = {
  getAllActivities,
  getActivityById,
  configActivityById,
  createActivity,
  deleteActivity
};

export const activitiesReducer = activitiesSlice.reducer;
