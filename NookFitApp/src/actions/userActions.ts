import { AppDispatch } from '../store';
import { 
  setEmail, 
  setUserProfile, 
  setToken, 
  setMaintenanceCalories,
  setCaloricTarget,
  setPresentation,
  setMacronutrients,
} from '../reducers/userReducer';

// Example thunk for fetching TDEE
export const fetchTDEE = (email: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`/api/users/tdee?email=${email}`);
    const data = await response.json();
    dispatch(setMaintenanceCalories(data.tdee));
  } catch (error) {
    console.error('Failed to fetch TDEE:', error);
  }
};
