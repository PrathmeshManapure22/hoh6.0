import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import Navbar from './components/NavBar';
import BookTicket from './pages/BookTicket';
import Wallet from './pages/Wallet';
import AddCoins from './pages/AddCoins';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import CryptoWallet from './pages/CryptoWallet';

function App() {
  // Additional initialization that needs to run after component mounts
  useEffect(() => {
    // Ensure bookings storage exists
    if (!localStorage.getItem('flightBookings')) {
      localStorage.setItem('flightBookings', JSON.stringify([]));
    }

    // Ensure reviews storage exists
    if (!localStorage.getItem('travelReviews')) {
      localStorage.setItem('travelReviews', JSON.stringify([]));
    }

    // Ensure crypto storage exists
    if (!localStorage.getItem('user_crypto')) {
      localStorage.setItem('user_crypto', JSON.stringify({}));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/book-ticket" element={<BookTicket />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/crypto-wallet" element={<CryptoWallet />} />
          <Route path="/add-coins" element={<AddCoins />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;