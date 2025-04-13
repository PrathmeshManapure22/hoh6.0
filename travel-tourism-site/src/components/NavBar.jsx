import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import Logo from '../assets/logo.jpg';
import { FaCoins, FaWallet, FaChevronDown } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={Logo} alt="SafeTrail Logo" className="logo-image" />
        <span className="logo-text">SafeTrail</span>
      </div>
      <div className="navbar-main">
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/book-ticket">Book Ticket</Link></li>
          <li className="wallet-dropdown">
            <button className="wallet-toggle">
              <FaWallet className="nav-icon" /> Wallets <FaChevronDown className="chevron" />
            </button>
            <ul className="wallet-submenu">
              <li><Link to="/wallet"><FaCoins /> Coin Wallet</Link></li>
              <li><Link to="/crypto-wallet"><FaCoins /> Crypto Wallet</Link></li>
              <li><Link to="/add-coins"><FaCoins /> Add Coins</Link></li>
            </ul>
          </li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">SignUp</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;