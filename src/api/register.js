import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiOrigin } from './origin';

export const registerApi = createApi({
  reducerPath: 'registerApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${apiOrigin}/register` }),
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (userData) => ({
        url: '/',
        method: 'POST',
        body: userData,
      }),
    })
  }),
});

export const { useRegisterUserMutation } = registerApi;
