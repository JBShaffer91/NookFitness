import { BACKEND_URL } from '@env';

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

export const registerUser = async (userData: any) => {
  console.log("Registering user with data:", userData);
  try {
    const response = await fetch(`${BACKEND_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
};

export const updateUserTDEE = async (userEmail: string, tdeeData: any) => {
  console.log("Updating TDEE for user:", userEmail, "with data:", tdeeData);
  try {
    const encodedEmail = encodeURIComponent(userEmail);
    const response = await fetch(`${BACKEND_URL}/api/users/profile/${encodedEmail}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tdeeData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("TDEE Update Error:", error);
    throw error;
  }
};

export const loginUser = async (userData: any) => {
  console.log("Logging in user with data:", userData);
  try {
    const response = await fetch(`${BACKEND_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

export default registerUser;
