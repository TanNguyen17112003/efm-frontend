import { Config } from 'src/config/api.config';
import {getUserInAsyncStorage} from 'src/helper/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_URL
});

const baseQueryWithInterceptor = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
  }
  return result;
};

export const API = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({})
});
