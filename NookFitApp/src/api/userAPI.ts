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

    // Check if the content type is JSON before parsing
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'An error occurred during registration.');
      }
      return data;
    } else {
      // If not JSON, just get the text response
      const text = await response.text();
      throw new Error(text || 'An error occurred during registration.');
    }
  } catch (error) {
    throw error;
  }
};

export default registerUser;
