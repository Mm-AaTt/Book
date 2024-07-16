import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you use axios for HTTP requests
import '../assets/styles/ProfilePage.css'; // Ensure the path matches your actual CSS file

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user data on component mount
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/`);// Replace with your API endpoint
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Error caught:', error);
        if (error.response) {
          if (error.response.status === 400) {
            setError(error.response.data);
          } else {
            setError(error.response.data|| 'An error occurred');
          }
        } else if (error.request) {
          setError('No response received from the server.');
        } else {
          setError('Request failed. Please try again later.');
        }
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
          {/* Add more profile details as needed */}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
