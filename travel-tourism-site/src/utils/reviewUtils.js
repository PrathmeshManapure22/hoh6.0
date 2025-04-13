import CryptoJS from 'crypto-js';

// Generate a unique hash for each review
export const generateReviewHash = (reviewData) => {
  const timestamp = new Date().toISOString();
  const dataString = `${reviewData.userId}-${reviewData.bookingId}-${reviewData.rating}-${reviewData.comment}-${timestamp}`;
  return CryptoJS.SHA256(dataString).toString();
};

// Validate review hash to ensure immutability
export const validateReviewHash = (review) => {
  const expectedHash = generateReviewHash({
    userId: review.userId,
    bookingId: review.bookingId,
    rating: review.rating,
    comment: review.comment,
    timestamp: review.timestamp
  });
  return review.hash === expectedHash;
};