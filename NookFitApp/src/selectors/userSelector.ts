import { RootState } from '../store';

export const selectEmail = (state: RootState) => state.user.email;
export const selectUserProfile = (state: RootState) => state.user.profile;
export const selectToken = (state: RootState) => state.user.token;
export const selectRefreshToken = (state: RootState) => state.user.refreshToken;  // <-- Added selector for refresh token
export const selectMaintenanceCalories = (state: RootState) => state.user.maintenanceCalories;
export const selectCaloricTarget = (state: RootState) => state.user.caloricTarget;
export const selectPresentation = (state: RootState) => state.user.presentation;
export const selectMacronutrients = (state: RootState) => state.user.macronutrients;
