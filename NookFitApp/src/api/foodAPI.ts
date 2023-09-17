import { BACKEND_URL } from '@env';

export const addFoodEntry = async (foodData: any) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/food`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(foodData),
    });

    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const fetchFoodEntries = async (userId: string, date: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/food/${userId}/${date}`);
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

// A helper function to handle API responses, to avoid repeating code
const handleResponse = async (response: Response) => {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'An error occurred.');
    }
    return data;
  } else {
    const text = await response.text();
    throw new Error(text || 'An error occurred.');
  }
};
