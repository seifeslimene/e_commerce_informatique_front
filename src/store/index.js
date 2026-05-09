import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { userApi } from '../api/user';
import { profileApi } from '../api/profile';
import { registerApi } from '../api/register';
import { loginApi } from '../api/login';

import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      profileApi.middleware,
      registerApi.middleware,
      loginApi.middleware
    ),
});

setupListeners(store.dispatch);
