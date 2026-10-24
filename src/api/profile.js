import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiOrigin } from './origin';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiOrigin}/profile`,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getProfile: build.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
