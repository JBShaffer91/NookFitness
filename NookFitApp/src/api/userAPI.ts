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

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || 'An error occurred during registration.');
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return await response.json();
    } else {
      throw new Error('Received non-JSON response during registration.');
    }
  } catch (error) {
    throw error;
  }
};

export const updateUserTDEE = async (userEmail: string, tdeeData: any) => {
  try {
    const encodedEmail = encodeURIComponent(userEmail);
    const response = await fetch(`${BACKEND_URL}/api/users/profile/${encodedEmail}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tdeeData),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || 'An error occurred during TDEE update.');
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return await response.json();
    } else {
      throw new Error('Received non-JSON response during TDEE update.');
    }
  } catch (error) {
    throw error;
  }
};

export default registerUser;
