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
  setUserId,
} from '../reducers/userReducer';
import { updateUserTDEE } from '../api/userAPI';

// Thunk for signing in the user
export const signInUser = (formData: { email: string; password: string }) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`/api/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error('Failed to sign in');
    const data = await response.json();
    
    // Dispatch actions to update the state with the user's data
    dispatch(setUserId(data.userId));
    dispatch(setEmail(data.email));
    dispatch(setToken(data.token));
    // ... dispatch other actions as needed ...

    return data; // Return the data for further processing in the component
  } catch (error) {
    console.error('Failed to sign in:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

export const fetchUserEmail = (userId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`/api/users/${userId}/email`);
    if (!response.ok) throw new Error('Failed to fetch Email');
    const data = await response.json();
    dispatch(setEmail(data.email));
  } catch (error) {
    console.error('Failed to fetch Email:', error);
  }
};

export const fetchUserProfile = (userId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`/api/users/${userId}/profile`);
    if (!response.ok) throw new Error('Failed to fetch User Profile');
    const data = await response.json();
    dispatch(setUserProfile(data.profile));
  } catch (error) {
    console.error('Failed to fetch User Profile:', error);
  }
};

export const fetchUserToken = (userId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`/api/users/${userId}/token`);
    if (!response.ok) throw new Error('Failed to fetch Token');
    const data = await response.json();
    dispatch(setToken(data.token));
  } catch (error) {
    console.error('Failed to fetch Token:', error);
  }
};

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
