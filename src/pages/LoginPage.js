import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import axios from 'axios'; // Assuming you use axios for HTTP requests
import '../assets/styles/LoginPage.css'; // Ensure the path matches your actual CSS file

const LoginPage = () => {
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { username, password });
      console.log('Login successful:', response.data);
      // Redirect to dashboard or home page after successful login
      navigate('/'); // Use navigate('/') to redirect to home page
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-login">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
