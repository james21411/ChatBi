// API utility functions for communicating with the ChatBI backend

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = { ...defaultOptions, ...options };

  // Add authorization header if session token exists
  const token = localStorage.getItem('chatbi_session_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
};

// Send a message to the chat API
export const sendMessage = async (message, sessionId = null) => {
  const payload = { query: message };
  if (sessionId) {
    payload.session_id = sessionId;
  }

  return await apiRequest('/api/ask', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

// Get conversation history
export const getHistory = async (sessionId) => {
  return await apiRequest(`/api/history?session_id=${sessionId}`);
};

// Get dashboard data
export const getDashboardData = async (sessionId) => {
  return await apiRequest(`/api/dashboard/data?session_id=${sessionId}`);
};

// Export data
export const exportData = async (format = 'csv', sessionId) => {
  return await apiRequest('/api/export', {
    method: 'POST',
    body: JSON.stringify({ format, session_id: sessionId }),
  });
};

// Create new session
export const createSession = async () => {
  const response = await apiRequest('/api/session/new', {
    method: 'POST',
  });

  // Store session token
  if (response.session_id) {
    localStorage.setItem('chatbi_session_token', response.session_id);
  }

  return response;
};

// Health check
export const healthCheck = async () => {
  return await apiRequest('/health');
};

// Error handler
export const handleApiError = (error) => {
  if (error.message.includes('401')) {
    // Unauthorized - clear session
    localStorage.removeItem('chatbi_session_token');
    window.location.reload();
  }

  return {
    error: true,
    message: error.message || 'An unexpected error occurred',
  };
};