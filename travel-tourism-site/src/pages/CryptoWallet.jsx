import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CryptoWallet.css';
import { FaCoins, FaHistory, FaArrowRight } from 'react-icons/fa';

function CryptoWallet() {
  const [walletData, setWalletData] = useState({
    balance: 0,
    transactions: [],
    isLoading: true,
    error: null
  });
  const [activeTab, setActiveTab] = useState('balance');
  const navigate = useNavigate();

  const fetchWalletData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('travelgo_user')) || {};
      const transactions = JSON.parse(localStorage.getItem('crypto_rewards')) || [];
      
      setWalletData({
        balance: userData.cryptoBalance || 0,
        transactions,
        isLoading: false,
        error: null
      });
    } catch (err) {
      console.error('Error fetching crypto wallet data:', err);
      setWalletData(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to load crypto wallet data'
      }));
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      fetchWalletData();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleRefresh = async () => {
    setWalletData(prev => ({ ...prev, isLoading: true }));
    await fetchWalletData();
  };

  if (walletData.isLoading) {
    return (
      <div className="crypto-wallet-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading crypto wallet data...</p>
        </div>
      </div>
    );
  }

  if (walletData.error) {
    return (
      <div className="crypto-wallet-container">
        <div className="error-message">
          <p>{walletData.error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="crypto-wallet-container">
      <div className="wallet-header">
        <h1>Crypto Rewards</h1>
        <div className="wallet-tabs">
          <button 
            className={`tab-button ${activeTab === 'balance' ? 'active' : ''}`}
            onClick={() => setActiveTab('balance')}
          >
            <FaCoins /> Balance
          </button>
          <button 
            className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <FaHistory /> Rewards History
          </button>
          <button 
            className="refresh-button"
            onClick={handleRefresh}
            title="Refresh balance"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {activeTab === 'balance' ? (
        <div className="balance-section">
          <div className="balance-card">
            <div className="balance-header">
              <h2>Crypto Rewards Balance</h2>
              <FaCoins className="coin-icon" />
            </div>
            <div className="balance-amount">
              <span className="amount">{walletData.balance.toFixed(6)}</span>
              <span className="currency">SafeTrail Crypto</span>
            </div>
            <div className="wallet-info">
              <p>Earn 2% crypto rewards on every booking!</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="history-section">
          <h2>Rewards History</h2>
          {walletData.transactions.length === 0 ? (
            <div className="no-transactions">
              <p>No rewards yet</p>
              <p>Book flights to earn crypto rewards!</p>
            </div>
          ) : (
            <div className="transactions-list">
              {walletData.transactions.map((tx) => (
                <div key={tx.id} className="transaction-item reward">
                  <div className="transaction-icon">
                    <FaArrowRight className="incoming" />
                  </div>
                  <div className="transaction-details">
                    <h3>{tx.description}</h3>
                    <div className="transaction-meta">
                      <span className="transaction-date">
                        {new Date(tx.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      <span className="transaction-status completed">
                        {tx.status}
                      </span>
                    </div>
                  </div>
                  <div className="transaction-amount reward">
                    +{tx.amount.toFixed(6)} crypto
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CryptoWallet;