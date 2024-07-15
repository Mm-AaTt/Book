import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('0');            // Default role is set to '0' (user)
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        username,
        email,
        password,
        role: parseInt(role), // Convert role to integer before sending
      });
      console.log('Registration successful:', response.data);
      onRegisterSuccess();
    } catch (error) {
      console.log('Error caught:', error);
      if (error.response) {
        if (error.response.status === 400) {
          setError('Username and email must be unique!');
        } else {
          setError(error.response.data.error || 'An error occurred');
        }
      } else if (error.request) {
        setError('No response received from the server.');
      } else {
        setError('Request failed. Please try again later.');
      }
    }
  };
  

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username" // Add autocomplete attribute for username
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email" // Add autocomplete attribute for email
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password" // Add autocomplete attribute for new password
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password" // Add autocomplete attribute for new password
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="0">User</option>
            <option value="1">Author</option>
            <option value="2">Admin</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
