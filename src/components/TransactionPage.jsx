import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [numberPlate, setNumberPlate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchTransactions = useCallback(async () => {
    try {
      if (!numberPlate || !phoneNumber) {
        setErrorMessage('Both number plate and phone number are required.');
        return;
      }

      // Log the URL to ensure it's correct
      const url = `http://localhost:5000/api/transactions?numberPlate=${numberPlate}&phoneNumber=${phoneNumber}`;
      console.log(`Fetching data from: ${url}`);

      const response = await axios.get(url);

      if (response.data && response.data.length > 0) {
        setTransactions(response.data);
      } else {
        setErrorMessage('No transactions found for the given credentials.');
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setErrorMessage('Error fetching data. Please try again later.');
    }
  }, [numberPlate, phoneNumber]);

  useEffect(() => {
    if (numberPlate && phoneNumber) {
      fetchTransactions(); // Automatically fetch when both fields are populated
    }
  }, [numberPlate, phoneNumber, fetchTransactions]);

  return (
    <div>
      <h1>Transaction Details</h1>
      <input
        type="text"
        placeholder="Enter Vehicle Number Plate"
        value={numberPlate}
        onChange={(e) => setNumberPlate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={fetchTransactions}>Fetch Transactions</button>

      <div>
        <h2>Transaction Data</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {transactions.length > 0 ? (
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                <p>Vehicle: {transaction.vehicleName}</p>
                <p>Transaction Date: {transaction.transactionDate}</p>
                <p>Details: {transaction.transactionDetails}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No transactions found for the given credentials.</p>
        )}
      </div>
    </div>
  );
}

export default TransactionPage;