import React from 'react';
import { useNavigate } from 'react-router-dom';
import Register from '../components/Auth/Register';
import '../assets/styles/RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    navigate('/login');
  };

  return (
    <div className="register-page">
      <Register onRegisterSuccess={handleRegisterSuccess} />
    </div>
  );
};

export default RegisterPage;
