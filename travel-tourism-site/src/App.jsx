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
import BookingConfirmation from './pages/BookingConfirmation';
import ItineraryPlanner from './components/ItineraryPlanner';
import MyBookings from './pages/MyBookings';
import ReviewForm from './components/ReviewForm';
import RewardSystem from './components/RewardSystem';

function App() {
  // Initialize all required localStorage items
  useEffect(() => {
    const initializeLocalStorage = (key, defaultValue) => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
      }
    };

    initializeLocalStorage('flightBookings', []);
    initializeLocalStorage('travelReviews', []);
    initializeLocalStorage('user_crypto', {});
    initializeLocalStorage('transaction_history', []);
    initializeLocalStorage('crypto_rewards', []);
    initializeLocalStorage('saved_itineraries', []);
    initializeLocalStorage('user_wallet', { balance: 0, transactions: [] });
    
    // Initialize user data if not exists
    if (!localStorage.getItem('travelgo_user')) {
      localStorage.setItem('travelgo_user', JSON.stringify({
        username: '',
        email: '',
        balance: 1000, // Starting balance for demo
        cryptoBalance: 0
      }));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/book-ticket" element={<BookTicket />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/crypto-wallet" element={<CryptoWallet />} />
          <Route path="/add-coins" element={<AddCoins />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          
          {/* Booking Management */}
          <Route path="/my-bookings" element={<MyBookings />} />
          
          {/* Review System */}
          <Route path="/review/:bookingId" element={<ReviewForm />} />
          
          {/* Itinerary Planning */}
          <Route path="/itinerary-planner" element={<ItineraryPlanner />} />
          
          {/* Reward System */}
          <Route path="/rewards" element={<RewardSystem />} />
          
          {/* Fallback Route */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;