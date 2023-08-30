// src/reducers/userReducer.ts

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setUserProfile, setToken } = userSlice.actions;
export default userSlice.reducer;
