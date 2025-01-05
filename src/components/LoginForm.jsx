import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    numberPlate: '',
    phoneNumber: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === 'numberPlate' ? value.toUpperCase() : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: formattedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.numberPlate || !formData.phoneNumber) {
      setError('Please fill in all fields');
      return;
    }

    const numberPlateRegex = /^[A-Z0-9]{3,8}$/;
    if (!numberPlateRegex.test(formData.numberPlate)) {
      setError('Please enter a valid number plate');
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      console.log('Login attempted with:', formData);
      navigate('/fines');
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>Vehicle Fine Checker</h2>
          <div className="car-icon">🚗</div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="numberPlate">Vehicle Number Plate</label>
            <input
              id="numberPlate"
              name="numberPlate"
              type="text"
              placeholder="Enter vehicle number plate"
              value={formData.numberPlate}
              onChange={handleInputChange}
              maxLength="8"
              className="number-plate-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              maxLength="10"
              className="phone-input"
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button type="submit" className="login-button">
            Check Fines
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
