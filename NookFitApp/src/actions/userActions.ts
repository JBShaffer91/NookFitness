import { AppDispatch } from '../store';
import { 
  setEmail, 
  setUserProfile, 
  setToken, 
  setMaintenanceCalories,
  setCaloricTarget,
  setPresentation,
  setMacronutrients,
  setTDEEError,
  setTDEE,
} from '../reducers/userReducer';
import { updateUserTDEE } from '../api/userAPI';

// Thunk for fetching Presentation
export const fetchPresentation = (userId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`/api/users/${userId}/presentation`); 
    if (!response.ok) throw new Error('Failed to fetch Presentation');
    const data = await response.json();
    dispatch(setPresentation(data.presentation));
  } catch (error) {
    console.error('Failed to fetch Presentation:', error);
    // Handle the error appropriately
  }
};

// Thunk for fetching TDEE
export const fetchTDEE = (email: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`/api/users/tdee?email=${email}`);
    if (!response.ok) throw new Error('Failed to fetch TDEE');
    const data = await response.json();
    dispatch(setMaintenanceCalories(data.tdee));
  } catch (error) {
    console.error('Failed to fetch TDEE:', error);
    if (error instanceof Error) {
      dispatch(setTDEEError(error.message));
    } else {
      dispatch(setTDEEError('An unknown error occurred'));
    }
  }
};

// Action creator for updating TDEE
export const updateTDEE = (userEmail: string, tdeeData: any) => async (dispatch: AppDispatch) => {
  try {
    const response = await updateUserTDEE(userEmail, tdeeData);
    if (!response.ok) throw new Error('Failed to update TDEE');
    const data = await response.json();
    dispatch(setTDEE(data.tdee));
  } catch (error) {
    console.error('Failed to update TDEE:', error);
    if (error instanceof Error) {
      dispatch(setTDEEError(error.message));
    } else {
      dispatch(setTDEEError('An unknown error occurred'));
    }
  }
};
