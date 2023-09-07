// NookFitApp/src/api/userAPI.ts

import { BACKEND_URL } from '@env';

export const registerUser = async (userData: any) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred during registration.');
    }

    return data;
  } catch (error) {
    throw error;
  }
};
