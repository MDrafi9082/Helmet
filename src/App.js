import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Ensure Routes is used

import LoginForm from './components/LoginForm';
import TransactionPage from './components/TransactionPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route path="/transactions" element={<TransactionPage />} />
      </Routes>
    </Router>
  );
};

export default App;