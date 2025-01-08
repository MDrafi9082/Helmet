import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Use useNavigate in v6
import './LoginForm.css'; // Import the style for LoginForm

const LoginForm = () => {
  const [numberPlate, setNumberPlate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        numberPlate,
        phoneNumber,
      });
  
      if (response.data.success) {
        console.log('Login successful'); // Log successful login
        localStorage.setItem('token', response.data.token);
        navigate('/transactions');
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setErrorMessage(err.response ? err.response.data.message : 'Something went wrong');
    }
  };
  
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-header">LOGIN</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Number Plate:</label>
            <input
              type="text"
              className="number-plate-input"
              value={numberPlate}
              onChange={(e) => setNumberPlate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              className="phone-input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default LoginForm;