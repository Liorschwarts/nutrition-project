/**
 * Food API calls
 */

import { getToken, handleResponse } from "./api-helpers.js";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const foodApi = {
  /**
   * Get all foods (public + user's custom)
   * @returns {Promise<Array>} - List of foods
   */
  getFoods: async () => {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await fetch(`${API_URL}/api/foods`, {
      headers,
    });

    return handleResponse(response);
  },

  /**
   * Search foods by name
   * @param {string} query - Search query
   * @returns {Promise<Array>} - List of matching foods
   */
  searchFoods: async (query) => {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await fetch(
      `${API_URL}/api/foods/search?query=${encodeURIComponent(query)}`,
      {
        headers,
      }
    );

    return handleResponse(response);
  },

  /**
   * Get food by ID
   * @param {string} id - Food ID
   * @returns {Promise<Object>} - Food data
   */
  getFoodById: async (id) => {
    const response = await fetch(`${API_URL}/api/foods/${id}`);
    return handleResponse(response);
  },

  /**
   * Create custom food
   * @param {Object} foodData - Food data
   * @returns {Promise<Object>} - Created food
   */
  createFood: async (foodData) => {
    const token = getToken();

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_URL}/api/foods`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(foodData),
    });

    return handleResponse(response);
  },

  /**
   * Update custom food
   * @param {string} id - Food ID
   * @param {Object} foodData - Updated food data
   * @returns {Promise<Object>} - Updated food
   */
  updateFood: async (id, foodData) => {
    const token = getToken();

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_URL}/api/foods/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(foodData),
    });

    return handleResponse(response);
  },

  /**
   * Delete custom food
   * @param {string} id - Food ID
   * @returns {Promise<Object>} - Response message
   */
  deleteFood: async (id) => {
    const token = getToken();

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_URL}/api/foods/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  },

  /**
   * Get foods by category
   * @param {string} category - Category name
   * @returns {Promise<Array>} - List of foods in category
   */
  getFoodsByCategory: async (category) => {
    const response = await fetch(`${API_URL}/api/foods/category/${category}`);
    return handleResponse(response);
  },

  /**
   * Get user's custom foods
   * @returns {Promise<Array>} - List of user's custom foods
   */
  getUserFoods: async () => {
    const token = getToken();

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_URL}/api/users/foods`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  },
};
