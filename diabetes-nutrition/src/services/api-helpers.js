/**
 * Helper function to handle API responses
 */
export async function handleResponse(response) {
  if (!response.ok) {
    // Try to get error message from response
    let errorMessage;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || `API error: ${response.status}`;
    } catch (e) {
      errorMessage = `API error: ${response.status}`;
    }
    throw new Error(errorMessage);
  }
  return response.json();
}

/**
 * Get authentication token from local storage
 */
export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}
