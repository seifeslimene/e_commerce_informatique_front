import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiOrigin } from './origin';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${apiOrigin}/login` }),
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
