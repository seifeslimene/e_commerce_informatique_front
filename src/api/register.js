import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const registerApi = createApi({
  reducerPath: 'registerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/register' }),
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
