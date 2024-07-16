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
        // Retrieve the token from localStorage (or another storage)
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          setError('No authentication token found. Please log in.');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Error caught:', error);
        if (error.response) {
          if (error.response.status === 400) {
            setError(error.response.data);
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
          <p><strong>User Role:</strong> {userData.user_role === 0 ? 'User' : userData.user_role === 1 ? 'Author' : 'Admin'}</p>
          {/* Add more profile details as needed */}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
