import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiOrigin } from './origin';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiOrigin}/user`,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetUserQuery } = userApi;
