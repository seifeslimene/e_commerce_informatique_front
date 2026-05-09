import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/login' }),
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (userData) => ({
        url: '/',
        method: 'POST',
        body: userData,
      }),
    })
  }),
});

export const { useLoginUserMutation } = loginApi;
