/**
 * API service for interacting with backend services
 */

import { getToken, handleResponse } from './api-helpers.js';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Authentication API calls
 */
export const authApi = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} - User data with token
   */
  register: async (userData) => {
    console.log('Registering user:', userData);
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await handleResponse(response);
    
    // Save token to local storage
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data;
  },
  
  /**
   * Log in user
   * @param {Object} credentials - User login credentials
   * @returns {Promise<Object>} - User data with token
   */
  login: async (credentials) => {
    console.log('Logging in user:', credentials.email);
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    const data = await handleResponse(response);
    
    // Save token to local storage
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data;
  },
  
  /**
   * Get current user profile
   * @returns {Promise<Object>} - User profile data
   */
  getCurrentUser: async () => {
    const token = getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await fetch(`${API_URL}/api/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return handleResponse(response);
  },
  
  /**
   * Update user settings
   * @param {Object} settings - User settings to update
   * @returns {Promise<Object>} - Updated settings
   */
  updateSettings: async (settings) => {
    console.log('Updating settings:', settings);
    const token = getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await fetch(`${API_URL}/api/auth/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(settings),
    });
    
    const result = await handleResponse(response);
    console.log('Settings update result:', result);
    return result;
  },
  
  /**
   * Log out user
   */
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
};