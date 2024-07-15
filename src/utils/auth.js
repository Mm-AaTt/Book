// auth.js

let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
};

export const getAuthToken = () => {
  return authToken;
};

export const isAuthenticated = () => {
  return !!authToken;
};

export const clearAuthToken = () => {
  authToken = null;
};

// Example function to save token to localStorage (optional)
export const saveAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Example function to load token from localStorage (optional)
export const loadAuthToken = () => {
  authToken = localStorage.getItem('authToken');
};

// Example function to remove token from localStorage (optional)
export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

// Example function to handle login/logout actions (optional)
export const handleLogin = (token) => {
  setAuthToken(token);
  saveAuthToken(token);
  // Additional logic for login success (e.g., redirect)
};

export const handleLogout = () => {
  clearAuthToken();
  removeAuthToken();
  // Additional logic for logout (e.g., redirect to login)
};
