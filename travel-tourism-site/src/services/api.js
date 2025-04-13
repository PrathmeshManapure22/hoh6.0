const API_BASE_URL = 'http://localhost:7860/api';

export const fetchUserRewards = async (username) => {
  const response = await fetch(`${API_BASE_URL}/users/${username}/rewards`);
  if (!response.ok) throw new Error('Failed to fetch rewards');
  return response.json();
};

export const fetchCryptoBalances = async (username) => {
  const response = await fetch(`${API_BASE_URL}/users/${username}/crypto`);
  if (!response.ok) throw new Error('Failed to fetch crypto balances');
  return response.json();
};

export const claimLoyaltyReward = async (username, crypto) => {
  const response = await fetch(`${API_BASE_URL}/users/${username}/claim-reward`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ crypto }),
  });
  if (!response.ok) throw new Error('Failed to claim reward');
  return response.json();
};

export const fetchWalletData = async (username) => {
  const response = await fetch(`${API_BASE_URL}/users/${username}/wallet`);
  if (!response.ok) throw new Error('Failed to fetch wallet data');
  return response.json();
};