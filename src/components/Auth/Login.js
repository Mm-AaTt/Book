import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });

      // Log the entire response to debug
      console.log('Response:', response);

      // Access token and role from the response
      const token = response.data.token;
      const role = response.data.role;

      console.log(token);

      // Check if token and role are undefined
      if (!token || !role) {
        throw new Error('Token or role is undefined');
      }

      // Store the token and role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Log to ensure the token is stored
      console.log('Token stored in localStorage:', token);

      // Clear input fields and error state after successful login
      setEmail('');
      setPassword('');
      setError(null);

      // Call the onLoginSuccess function passed as a prop
      onLoginSuccess();

    } catch (error) {
      // Handle and set error state if login fails
      setError(error.response?.data?.error || error.message || 'An error occurred');
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Login;
