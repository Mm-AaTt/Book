import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/ProfilePage.css'; // Ensure the path matches your actual CSS file

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        if (!token) {
          setError('No authentication token found. Please log in.');
          setLoading(false);
          return;
        }

        // Function to check if token is expired
        const isTokenExpired = (token) => {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          return Date.now() >= decodedToken.exp * 1000;
        };

        if (isTokenExpired(token)) {
          // Handle token refresh logic
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
              setError('No refresh token found. Please log in again.');
              setLoading(false);
              return;
            }

            const refreshResponse = await axios.post(`${process.env.REACT_APP_API_URL}/refresh-token`, {
              refreshToken
            });

            const newToken = refreshResponse.data.token;
            localStorage.setItem('token', newToken);

            // Retry the original request with the new token
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/`, {
              headers: {
                Authorization: `Bearer ${newToken}`
              }
            });

            console.log('User Data:', response.data); // Log the response data to check structure
            setUserData(response.data);
            setLoading(false);
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            setError('Token refresh failed. Please log in again.');
            setLoading(false);
          }
        } else {
          // Token is valid, proceed with fetching user data
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          console.log('User Data:', response.data); // Log the response data to check structure
          setUserData(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error caught:', error);
        if (error.response) {
          if (error.response.status === 401) {
            setError('Authentication failed. Please log in again.');
          } else if (error.response.status === 400) {
            setError(error.response.data.message || 'Bad Request');
          } else {
            setError(error.response.data || 'An error occurred');
          }
        } else if (error.request) {
          setError('No response received from the server.');
        } else {
          setError('Request failed. Please try again later.');
        }
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="profile-page">
      <h2>User Profile</h2>
      {userData && (
        <div className="profile-details">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Date of Birth:</strong> {userData.date_of_birth}</p>
          <p><strong>User Role:</strong> {userData.user_role === 0 ? 'User' : userData.user_role === 1 ? 'User' : 'Author'}</p>
          {/* Add more profile details as needed */}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
