import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
  userId: string | null;
  email: string | null;
  profile: any | null; 
  token: string | null;
  refreshToken: string | null;
  maintenanceCalories: number | null;
  caloricTarget: number | null;
  presentation: string | null;
  macronutrients: any | null; 
  tdeeError: string | null;
  tdee: number | null;
};

const initialState: UserState = {
  userId: null,
  email: null,
  profile: null,
  token: null,
  refreshToken: null,
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
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setEmail: (state, action) => { 
      state.email = action.payload;
    },
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRefreshToken: (state, action) => { 
      state.refreshToken = action.payload;
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
  setUserId,
  setEmail,
  setUserProfile, 
  setToken, 
  setRefreshToken,
  setMaintenanceCalories,
  setCaloricTarget,
  setPresentation,
  setMacronutrients,
  setTDEEError,
  setTDEE,
} = userSlice.actions;

export default userSlice.reducer;