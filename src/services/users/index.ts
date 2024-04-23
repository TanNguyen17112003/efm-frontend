import { API } from '../base';
import CircularJSON from 'circular-json';

type UserForm = {
  email: string;
  password: string;
};

const userApi = API.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.mutation<any, Partial<any>>({
      query: (params) => ({
        url: `user/profile`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${params.token}`
        }
      })
    })
  }),
  overrideExisting: true
});

const loginDB = API.injectEndpoints({
  endpoints: (build) => ({
    signin: build.mutation<any, Partial<any>>({
      query: (body: UserForm) => ({
        url: 'user/signin',
        method: 'POST',
        body
      })
    })
  }),
  overrideExisting: true
});

export const { useGetUserMutation } = userApi;
export const { useSigninMutation } = loginDB;
