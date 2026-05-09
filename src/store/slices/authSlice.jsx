import { createSlice } from '@reduxjs/toolkit';

const userId = sessionStorage.getItem('userId');
const token = sessionStorage.getItem('token');

const slice = createSlice({
  name: 'auth',
  initialState: { userId: userId || null, token: token || null },
  reducers: {
    setUser: (state, { payload: { userId, token } }) => {
      state.userId = userId;
      state.token = token;
    },
    logoutUser: (state) => {
      state.userId = null;
      state.token = null;
    }
  },
});

export const { setUser } = slice.actions;
export const { logoutUser } = slice.actions;

export default slice.reducer;

export const selectCurrentUserId = (state) => state.auth.userId;
export const selectCurrentToken = (state) => state.auth.token;
