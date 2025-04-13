// src/components/AuthModal.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthModal.css';

const AuthModal = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Start Your Journey</h2>
        <p>Please login or sign up to continue</p>
        <div className="auth-options">
          <button 
            className="auth-button login-button" 
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button 
            className="auth-button signup-button" 
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;