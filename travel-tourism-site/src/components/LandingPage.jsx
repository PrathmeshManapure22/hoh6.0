import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';
import { getReviewsByDestination, getAverageRating } from '../utils/reviewUtils';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleStartJourney = () => {
    setShowAuthModal(true);
  };

  const popularDestinations = [
    { 
      id: 1, 
      name: 'Shimla', 
      image: 'https://img.freepik.com/free-photo/tourists-taking-photos-beautiful-scenery-skiing-around-deogyusan_335224-426.jpg',
      description: 'The Queen of Hills'
    },
    { 
      id: 2, 
      name: 'Manali', 
      image: 'https://img.freepik.com/free-photo/mesmerizing-view-houses-fields-covered-snow-surrounded-by-mountains-trees_181624-13827.jpg',
      description: 'A Paradise for Honeymooners'
    },
    { 
      id: 3, 
      name: 'Dharamshala', 
      image: 'https://img.freepik.com/free-photo/beautiful-landscape-arang-kel-kashmir-with-green-fields-local-houses-with-hidden-clouds_505751-5863.jpg',
      description: 'The Little Lhasa'
    },
    { 
      id: 4, 
      name: 'Kullu', 
      image: 'https://img.freepik.com/free-photo/cloudy-day-mountains-from-small-village-cortina-dolomites_181624-30173.jpg',
      description: 'The Valley of Gods'
    }
  ];

  // Get actual reviews from localStorage
  const userReviews = [
    {
      id: 1,
      rating: 5,
      text: "SafeTrail made my Himalayan trek unforgettable. The booking was seamless and the guides were exceptional!",
      reviewer: "Priya Sharma",
      destination: "Shimla"
    },
    {
      id: 2,
      rating: 4,
      text: "Great experience overall. The app helped me discover hidden gems in Goa I would have never found on my own.",
      reviewer: "Raj Patel",
      destination: "Manali"
    },
    {
      id: 3,
      rating: 5,
      text: "The cultural tours in Rajasthan were amazing. SafeTrail's local experts really brought the history to life.",
      reviewer: "Ananya Gupta",
      destination: "Dharamshala"
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section with Background Image */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Explore the Wonders of India with SafeTrail</h1>
          <p>
            From the snow-capped Himalayas to the serene beaches of Goa, experience
            the diversity and beauty of India like never before.
          </p>
          <button className="explore-button" onClick={handleStartJourney}>
            Start Your Journey
          </button>
        </div>
      </div>

      {/* Popular Destinations Section */}
      <section className="popular-destinations">
        <div className="section-container">
          <h2>Popular Destinations</h2>
          <div className="destinations-grid">
            {popularDestinations.map(destination => (
              <div key={destination.id} className="destination-card">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="destination-image"
                />
                <div className="destination-info">
                  <h3>{destination.name}</h3>
                  <p className="destination-description">{destination.description}</p>
                  <div className="rating">
                    ★ {getAverageRating(destination.name) || '5.0'} 
                    <span>({getReviewsByDestination(destination.name).length || 0} reviews)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <div className="reviews-section">
        <div className="section-container">
          <h2>What Our Travelers Say</h2>
          <div className="reviews-grid">
            {userReviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-content">
                  <div className="rating">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                  <p className="review-text">"{review.text}"</p>
                  <div className="reviewer">- {review.reviewer}</div>
                  <div className="review-destination">{review.destination}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="about">
        <div className="section-container">
          <h2>About SafeTrails</h2>
          <p>
            SafeTrail is your ultimate travel companion for exploring India's hidden treasures.
            Whether you're looking for adventure, tranquility, or cultural immersion, SafeTrail is here
            to make your journey unforgettable.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <footer>
        <div className="footer-container">
          <p>© 2025 SafeTrails. All rights reserved.</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
          </div>
        </div>
      </footer>

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}

export default LandingPage;