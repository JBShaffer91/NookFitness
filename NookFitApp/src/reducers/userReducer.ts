// src/reducers/userReducer.ts

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  token: null,
  maintenanceCalories: null,
  caloricTarget: null,
  presentation: null,
  macronutrients: null,
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
    }
  },
});

export const { 
  setUserProfile, 
  setToken, 
  setMaintenanceCalories,
  setCaloricTarget,
  setPresentation,
  setMacronutrients,
} = userSlice.actions;

export default userSlice.reducer;
