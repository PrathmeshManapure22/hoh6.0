import React, { useState } from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

function LandingPage() {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleStartJourney = () => {
    setShowAuthModal(true);
  };

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
      <div className="destinations">
        <div className="section-container">
          <h2>Popular Places</h2>
          <div className="image-grid">
            <div className="destination-card">
              <img src="https://img.freepik.com/free-photo/tourists-taking-photos-beautiful-scenery-skiing-around-deogyusan_335224-426.jpg" alt="Shimla" />
              <p className="image-caption">Shimla - The Queen of Hills</p>
            </div>
            <div className="destination-card">
              <img src="https://img.freepik.com/free-photo/mesmerizing-view-houses-fields-covered-snow-surrounded-by-mountains-trees_181624-13827.jpg" alt="Manali" />
              <p className="image-caption">Manali - A Paradise for Honeymooners</p>
            </div>
            <div className="destination-card">
              <img src="https://img.freepik.com/free-photo/beautiful-landscape-arang-kel-kashmir-with-green-fields-local-houses-with-hidden-clouds_505751-5863.jpg" alt="Dharamshala" />
              <p className="image-caption">Dharamshala - The Little Lhasa</p>
            </div>
            <div className="destination-card">
              <img src="https://img.freepik.com/free-photo/cloudy-day-mountains-from-small-village-cortina-dolomites_181624-30173.jpg" alt="Kullu Valley" />
              <p className="image-caption">Kullu - The Valley of Gods</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <div className="section-container">
          <h2>What Our Travelers Say</h2>
          <div className="reviews-grid">
            <div className="review-card">
              <div className="review-content">
                <div className="rating">★★★★★</div>
                <p className="review-text">
                  "SafeTrail made my Himalayan trek unforgettable. The booking was seamless and the guides were exceptional!"
                </p>
                <div className="reviewer">- Priya Sharma</div>
              </div>
            </div>
            <div className="review-card">
              <div className="review-content">
                <div className="rating">★★★★☆</div>
                <p className="review-text">
                  "Great experience overall. The app helped me discover hidden gems in Goa I would have never found on my own."
                </p>
                <div className="reviewer">- Raj Patel</div>
              </div>
            </div>
            <div className="review-card">
              <div className="review-content">
                <div className="rating">★★★★★</div>
                <p className="review-text">
                  "The cultural tours in Rajasthan were amazing. SafeTrail's local experts really brought the history to life."
                </p>
                <div className="reviewer">- Ananya Gupta</div>
              </div>
            </div>
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