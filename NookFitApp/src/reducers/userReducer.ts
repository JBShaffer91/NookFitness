// src/reducers/userReducer.ts

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  profile: null,
  token: null,
  maintenanceCalories: null,
  caloricTarget: null,
  presentation: null,
  macronutrients: null,
  tdeeError: null,
  tdee: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action) => { 
      state.email = action.payload;
    },
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setMaintenanceCalories: (state, action) => {
      state.maintenanceCalories = action.payload;
    },
    setCaloricTarget: (state, action) => {
      state.caloricTarget = action.payload;
    },
    setPresentation: (state, action) => {
      state.presentation = action.payload;
    },
    setMacronutrients: (state, action) => {
      state.macronutrients = action.payload;
    },
    setTDEEError: (state, action) => {
      state.tdeeError = action.payload;
    },
    setTDEE: (state, action) => {
      state.tdee = action.payload;
    },
  },
});

export const { 
  setEmail,
  setUserProfile, 
  setToken, 
  setMaintenanceCalories,
  setCaloricTarget,
  setPresentation,
  setMacronutrients,
  setTDEEError,
  setTDEE,
} = userSlice.actions;

export default userSlice.reducer;
