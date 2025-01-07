// LoginForm.jsx (src/components folder)
import { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    numberPlate: '',
    phoneNumber: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === 'numberPlate' ? value.toUpperCase() : value;
    setFormData((prevState) => ({
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
  
    const numberPlateRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/;
    if (!numberPlateRegex.test(formData.numberPlate)) {
      setError('Please enter a valid Indian vehicle number plate');
      return;
    }
  
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numberPlate: formData.numberPlate,
          phoneNumber: formData.phoneNumber,
        }),
      });
  
      const data = await response.json();
      console.log(data); // Check for success response from server
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Error:', err);
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box"> {/* Added login-box div */}
        <div className="login-header">
          <h2>Vehicle Fine Checker</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="numberPlate">Number Plate:</label>
            <input
              id="numberPlate"
              name="numberPlate"
              type="text"
              value={formData.numberPlate}
              onChange={handleInputChange}
              className="number-plate-input" // Applied specific styling
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="phone-input" // Applied specific styling
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;