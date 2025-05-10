import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddInventoryPage from './pages/AddInventoryPage';
import WithdrawInventoryPage from './pages/WithdrawInventoryPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-inventory" element={<AddInventoryPage />} />
        <Route path="/remove-inventory" element={<WithdrawInventoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
