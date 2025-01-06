import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TransactionPage.css';

const TransactionPage = () => {
  const navigate = useNavigate();
  const [fines, setFines] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setTimeout(() => {
      const mockFines = [
        {
          id: 1,
          date: '2024-01-15',
          violation: 'Speeding',
          location: 'Main Street',
          amount: 150.00,
          status: 'Unpaid'
        },
        {
          id: 2,
          date: '2024-01-20',
          violation: 'Illegal Parking',
          location: 'Central Avenue',
          amount: 75.00,
          status: 'Unpaid'
        },
        {
          id: 3,
          date: '2024-01-25',
          violation: 'Red Light',
          location: 'Oak Road',
          amount: 200.00,
          status: 'Paid'
        }
      ];

      setFines(mockFines);
      setTotalAmount(mockFines.reduce((sum, fine) => 
        fine.status === 'Unpaid' ? sum + fine.amount : sum, 0
      ));
      setLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const handlePayment = (fineId) => {
    console.log('Processing payment for fine:', fineId);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your fines...</p>
      </div>
    );
  }

  return (
    <div className="transaction-container">
      <div className="header">
        <h1>Traffic Violations & Fines</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="summary-box">
        <div className="summary-item">
          <h3>Total Unpaid Fines</h3>
          <p className="amount">${totalAmount.toFixed(2)}</p>
        </div>
        <div className="summary-item">
          <h3>Total Violations</h3>
          <p>{fines.length}</p>
        </div>
      </div>

      <div className="fines-container">
        <h2>Fine Details</h2>
        {fines.length === 0 ? (
          <div className="no-fines">
            <p>No traffic violations found.</p>
          </div>
        ) : (
          fines.map(fine => (
            <div key={fine.id} className={`fine-card ${fine.status.toLowerCase()}`}>
              <div className="fine-header">
                <h3>{fine.violation}</h3>
                <span className={`status-badge ${fine.status.toLowerCase()}`}>
                  {fine.status}
                </span>
              </div>
              <div className="fine-details">
                <div className="detail-item">
                  <span className="label">Date:</span>
                  <span>{new Date(fine.date).toLocaleDateString()}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Location:</span>
                  <span>{fine.location}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Amount:</span>
                  <span className="amount">${fine.amount.toFixed(2)}</span>
                </div>
              </div>
              {fine.status === 'Unpaid' && (
                <button 
                  className="pay-button"
                  onClick={() => handlePayment(fine.id)}
                >
                  Pay Now
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionPage;