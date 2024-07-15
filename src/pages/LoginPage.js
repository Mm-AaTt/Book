import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Auth/Login';
import '../assets/styles/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/');
  };

  return (
    <div className="login-page">
      <Login onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
