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
import { loginUser, updateUserTDEE, refreshToken, updateUserFitnessGoals as apiUpdateUserFitnessGoals } from '../api/userAPI';

const handleResponse = async (response: Response) => {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || 'Unexpected error occurred.');
    }
    return responseData;
  } else {
    const text = await response.text();
    console.error("Received non-JSON response:", text);
    throw new Error('Received non-JSON response.');
  }
};

// Thunk for signing in the user
export const signInUser = (formData: { email: string; password: string }) => async (dispatch: AppDispatch) => {
  try {
    const data = await loginUser(formData);
    
    dispatch(setUserId(data.userId));
    dispatch(setEmail(data.email));
    dispatch(setToken(data.token));

    return data;
  } catch (error) {
    console.error('Failed to sign in:', error);
    throw error;
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

export const fetchPresentation = (userId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`/api/users/${userId}/presentation`); 
    if (!response.ok) throw new Error('Failed to fetch Presentation');
    const data = await response.json();
    dispatch(setPresentation(data.presentation));
  } catch (error) {
    console.error('Failed to fetch Presentation:', error);
  }
};

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

export const updateTDEE = (userEmail: string, tdeeData: any, token: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await updateUserTDEE(userEmail, tdeeData, token);
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

export const updateUserFitnessGoals = (userEmail: string, fitnessData: any, token: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await apiUpdateUserFitnessGoals(userEmail, fitnessData, token);
    if (!response.ok) throw new Error('Failed to update fitness goals and caloric target');
    const data = await response.json();
    dispatch(setCaloricTarget(data.caloricTarget));
  } catch (error) {
    console.error('Failed to update fitness goals and caloric target:', error);
  }
};

export const updateCaloricTarget = (caloricValue: number) => (dispatch: AppDispatch) => {
  try {
    dispatch(setCaloricTarget(caloricValue));
  } catch (error) {
    console.error('Failed to update caloric target:', error);
  }
};

// Thunk for refreshing the access token
export const refreshAccessToken = (storedRefreshToken: string) => async (dispatch: AppDispatch) => {
  try {
    const data = await refreshToken(storedRefreshToken);
    dispatch(setToken(data.token));
    return data;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
};
