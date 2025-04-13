import React, { useState, useEffect } from 'react';
import { FaCoins, FaHistory } from 'react-icons/fa';
import './CryptoWallet.css';

const CryptoWallet = () => {
  const [cryptoBalance, setCryptoBalance] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const CRYPTO_CURRENCIES = {
    "BTC": { name: "Bitcoin", icon: "₿" },
    "ETH": { name: "Ethereum", icon: "Ξ" },
    "BNB": { name: "Binance Coin", icon: "Ⓝ" },
    "SOL": { name: "Solana", icon: "◎" },
    "XRP": { name: "Ripple", icon: "✕" },
    "ADA": { name: "Cardano", icon: "₳" },
    "DOGE": { name: "Dogecoin", icon: "Ð" },
    "DOT": { name: "Polkadot", icon: "●" }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    setIsLoading(true);
    try {
      const cryptoData = JSON.parse(localStorage.getItem('user_crypto')) || {};
      const txData = JSON.parse(localStorage.getItem('transaction_history')) || [];
      
      setCryptoBalance(cryptoData);
      setTransactions(txData.filter(tx => tx.type === 'reward'));
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCryptoPrice = (crypto) => {
    const prices = {
      BTC: 60000,
      ETH: 3000,
      BNB: 500,
      SOL: 150,
      XRP: 0.5,
      ADA: 0.45,
      DOGE: 0.12,
      DOT: 7
    };
    return prices[crypto] || 1;
  };

  return (
    <div className="crypto-wallet">
      <header className="wallet-header">
        <h1><FaCoins /> Crypto Wallet</h1>
        <p>Manage your cryptocurrency rewards</p>
      </header>

      <section className="balance-section">
        <h2>Your Crypto Assets</h2>
        {isLoading ? (
          <div className="loading">Loading balances...</div>
        ) : (
          <div className="crypto-grid">
            {Object.entries(CRYPTO_CURRENCIES).map(([code, info]) => (
              cryptoBalance[code] > 0 && (
                <div key={code} className="crypto-card">
                  <div className="crypto-icon">{info.icon}</div>
                  <div className="crypto-info">
                    <h3>{info.name}</h3>
                    <p className="crypto-amount">
                      {cryptoBalance[code].toFixed(8)} <span>{code}</span>
                    </p>
                    <p className="crypto-value">
                      ${(cryptoBalance[code] * getCryptoPrice(code)).toFixed(2)} USD
                    </p>
                  </div>
                </div>
              )
            ))}
            {Object.values(cryptoBalance).every(bal => bal <= 0) && (
              <div className="empty-wallet">
                <p>No cryptocurrency holdings yet</p>
                <p>Claim rewards from bookings to receive crypto!</p>
              </div>
            )}
          </div>
        )}
      </section>

      <section className="transaction-section">
        <h2><FaHistory /> Transaction History</h2>
        {isLoading ? (
          <div className="loading">Loading transactions...</div>
        ) : (
          <div className="transaction-list">
            {transactions.length > 0 ? (
              transactions.map(tx => (
                <div key={tx.id} className="transaction-item">
                  <div className="tx-icon">↑</div>
                  <div className="tx-details">
                    <div className="tx-header">
                      <span className="tx-amount">+{tx.cryptoAmount.toFixed(8)} {tx.crypto}</span>
                      <span className="tx-date">{formatDate(tx.date)}</span>
                    </div>
                    <p className="tx-description">{tx.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-transactions">
                <p>No crypto transactions yet</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default CryptoWallet;