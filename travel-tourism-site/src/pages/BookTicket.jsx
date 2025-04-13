import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookTicket.css';
import ReviewModal from '../components/ReviewModal';

// Airport data for major Indian cities
const cityAirports = {
  Delhi: ['Indira Gandhi International (DEL)', 'Safdarjung Airport (OSD)'],
  Mumbai: ['Chhatrapati Shivaji Maharaj International (BOM)', 'Juhu Aerodrome (JUI)'],
  Bangalore: ['Kempegowda International (BLR)', 'HAL Airport (HAL)'],
  Kolkata: ['Netaji Subhash Chandra Bose International (CCU)'],
  Chennai: ['Chennai International (MAA)'],
  Hyderabad: ['Rajiv Gandhi International (HYD)'],
  Goa: ['Dabolim Airport (GOI)', 'Manohar International Airport (GOX)'],
  Jaipur: ['Jaipur International (JAI)'],
  Kochi: ['Cochin International (COK)'],
  Ahmedabad: ['Sardar Vallabhbhai Patel International (AMD)']
};

const BookTicket = () => {
  const [formData, setFormData] = useState({
    tripType: 'roundtrip',
    fromCity: '',
    toCity: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    cabinClass: 'economy',
    fromAirport: '',
    toAirport: ''
  });
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('book');
  const [error, setError] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewBooking, setReviewBooking] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  // Load bookings and reviews from localStorage on component mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('flightBookings');
    const savedReviews = localStorage.getItem('travelReviews');
    
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
    
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('flightBookings', JSON.stringify(bookings));
  }, [bookings]);

  // Save reviews to localStorage when they change
  useEffect(() => {
    localStorage.setItem('travelReviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Reset airports when cities change
    if (name === 'fromCity') {
      setFormData(prev => ({ ...prev, fromAirport: '' }));
    }
    if (name === 'toCity') {
      setFormData(prev => ({ ...prev, toAirport: '' }));
    }
  };

  const searchFlights = async () => {
    if (!formData.fromCity || !formData.toCity || !formData.fromAirport || !formData.toAirport) {
      setError('Please select cities and airports');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      // Mock API call - replace with actual FlightAPI integration
      const mockResponse = {
        data: [
          {
            id: 'fl123',
            airline: 'IndiGo',
            flightNumber: '6E-123',
            departureTime: '08:00',
            arrivalTime: '10:30',
            duration: '2h 30m',
            price: Math.floor(Math.random() * 10000) + 5000,
            seatsAvailable: Math.floor(Math.random() * 20) + 5
          },
          {
            id: 'fl456',
            airline: 'Air India',
            flightNumber: 'AI-456',
            departureTime: '12:00',
            arrivalTime: '14:45',
            duration: '2h 45m',
            price: Math.floor(Math.random() * 10000) + 6000,
            seatsAvailable: Math.floor(Math.random() * 15) + 3
          }
        ]
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFlights(mockResponse.data);
    } catch (error) {
      console.error('Error fetching flights:', error);
      setError('Failed to fetch flights. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const confirmBooking = () => {
    if (!selectedFlight) {
      setError('Please select a flight first');
      return;
    }

    // Get user data
    const userData = JSON.parse(localStorage.getItem('travelgo_user')) || {};
    
    // Check balance
    if ((userData.balance || 0) < selectedFlight.price) {
      setError(`Insufficient coins. You need ${selectedFlight.price} coins but only have ${userData.balance || 0}`);
      return;
    }

    // Create transaction record
    const timestamp = new Date().toISOString();
    const txId = `tx_${Date.now()}`;
    const bookingTx = {
      id: txId,
      type: 'booking',
      amount: selectedFlight.price,
      date: timestamp,
      description: `${selectedFlight.airline} to ${formData.toCity}`,
      status: 'completed',
      rewardEligible: true
    };

    // Update user balance
    userData.balance = (userData.balance || 0) - selectedFlight.price;
    localStorage.setItem('travelgo_user', JSON.stringify(userData));

    // Save transaction to history
    const txHistory = JSON.parse(localStorage.getItem('transaction_history')) || [];
    txHistory.unshift(bookingTx);
    localStorage.setItem('transaction_history', JSON.stringify(txHistory));

    // Create booking record
    const bookingDetails = {
      ...formData,
      ...selectedFlight,
      bookingId: `FL-${Date.now().toString().slice(-6)}`,
      status: 'Confirmed',
      bookingDate: new Date().toLocaleString(),
      passengerName: userData.username || 'Guest',
      canReview: true,
      hasReview: false,
      transactionId: txId
    };

    setBookings([...bookings, bookingDetails]);
    setSelectedFlight(null);
    setFlights([]);
    setActiveTab('status');
    setError('');
    alert(`Booking confirmed! Your PNR is ${bookingDetails.bookingId}\nYou can now leave a review for this booking.`);
  };

  const handleReviewSubmit = (reviewData) => {
    // Add to reviews state
    const updatedReviews = [...reviews, reviewData];
    setReviews(updatedReviews);
    
    // Update booking to mark as reviewed
    const updatedBookings = bookings.map(booking => 
      booking.bookingId === reviewData.bookingId 
        ? { ...booking, canReview: false, hasReview: true }
        : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('flightBookings', JSON.stringify(updatedBookings));
  };

  const openReviewModal = (booking) => {
    setReviewBooking(booking);
    setShowReviewModal(true);
  };

  return (
    <div className="book-ticket-container">
      <div className="booking-tabs">
        <button 
          className={`tab-button ${activeTab === 'book' ? 'active' : ''}`}
          onClick={() => setActiveTab('book')}
        >
          Book Flight
        </button>
        <button 
          className={`tab-button ${activeTab === 'status' ? 'active' : ''}`}
          onClick={() => setActiveTab('status')}
        >
          My Bookings
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {activeTab === 'book' ? (
        <div className="booking-form">
          <h2>Flight Search</h2>
          
          <div className="form-group">
            <label>Trip Type:</label>
            <select name="tripType" value={formData.tripType} onChange={handleChange}>
              <option value="roundtrip">Round Trip</option>
              <option value="oneway">One Way</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>From City:</label>
              <select 
                name="fromCity" 
                value={formData.fromCity}
                onChange={handleChange}
                required
              >
                <option value="">Select City</option>
                {Object.keys(cityAirports).map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>To City:</label>
              <select 
                name="toCity" 
                value={formData.toCity}
                onChange={handleChange}
                required
              >
                <option value="">Select City</option>
                {Object.keys(cityAirports)
                  .filter(city => city !== formData.fromCity)
                  .map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
              </select>
            </div>
          </div>

          {formData.fromCity && (
            <div className="form-group">
              <label>Departure Airport:</label>
              <select 
                name="fromAirport" 
                value={formData.fromAirport}
                onChange={handleChange}
                required
              >
                <option value="">Select Airport</option>
                {cityAirports[formData.fromCity]?.map(airport => (
                  <option key={airport} value={airport}>{airport}</option>
                ))}
              </select>
            </div>
          )}

          {formData.toCity && (
            <div className="form-group">
              <label>Arrival Airport:</label>
              <select 
                name="toAirport" 
                value={formData.toAirport}
                onChange={handleChange}
                required
              >
                <option value="">Select Airport</option>
                {cityAirports[formData.toCity]?.map(airport => (
                  <option key={airport} value={airport}>{airport}</option>
                ))}
              </select>
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label>Departure Date:</label>
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {formData.tripType === 'roundtrip' && (
              <div className="form-group">
                <label>Return Date:</label>
                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  required
                  min={formData.departureDate || new Date().toISOString().split('T')[0]}
                />
              </div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Passengers:</label>
              <input
                type="number"
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                min="1"
                max="9"
              />
            </div>

            <div className="form-group">
              <label>Cabin Class:</label>
              <select name="cabinClass" value={formData.cabinClass} onChange={handleChange}>
                <option value="economy">Economy</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </select>
            </div>
          </div>

          <button 
            className="search-button"
            onClick={searchFlights}
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search Flights'}
          </button>

          {flights.length > 0 && (
            <div className="flight-results">
              <h3>Available Flights</h3>
              {flights.map(flight => (
                <div 
                  key={flight.id}
                  className={`flight-card ${selectedFlight?.id === flight.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedFlight(flight);
                    setError('');
                  }}
                >
                  <div className="flight-header">
                    <span className="airline">{flight.airline}</span>
                    <span className="flight-number">{flight.flightNumber}</span>
                  </div>
                  <div className="flight-details">
                    <div className="time-details">
                      <span className="time">{flight.departureTime}</span>
                      <span className="duration">{flight.duration}</span>
                      <span className="time">{flight.arrivalTime}</span>
                    </div>
                    <div className="price-details">
                      <span className="price">₹{flight.price}</span>
                      <span className="seats">{flight.seatsAvailable} seats left</span>
                    </div>
                  </div>
                </div>
              ))}

              {selectedFlight && (
                <button 
                  className="confirm-button"
                  onClick={confirmBooking}
                >
                  Confirm Booking
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="booking-status">
          <h2>My Flight Bookings</h2>
          {bookings.length === 0 ? (
            <p className="no-bookings">No flight bookings yet. Book your first flight!</p>
          ) : (
            <div className="bookings-list">
              {bookings.map((booking, index) => (
                <div key={index} className="booking-card">
                  <div className="booking-header">
                    <span className="booking-id">PNR: {booking.bookingId}</span>
                    <span className={`status-badge ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="booking-details">
                    <p><strong>Route:</strong> {booking.fromCity} ({booking.fromAirport}) → {booking.toCity} ({booking.toAirport})</p>
                    <p><strong>Flight:</strong> {booking.airline} {booking.flightNumber}</p>
                    <p><strong>Departure:</strong> {booking.departureDate} at {booking.departureTime}</p>
                    {booking.returnDate && <p><strong>Return:</strong> {booking.returnDate}</p>}
                    <p><strong>Passengers:</strong> {booking.passengers} ({booking.cabinClass})</p>
                    <p><strong>Price:</strong> {booking.price} coins</p>
                    <p><strong>Booked on:</strong> {booking.bookingDate}</p>
                    
                    {booking.canReview && (
                      <button 
                        className="review-button"
                        onClick={() => openReviewModal(booking)}
                      >
                        Leave Review
                      </button>
                    )}
                    
                    {booking.hasReview && (
                      <div className="existing-review">
                        <p><strong>Your Review:</strong> 
                          {reviews.find(r => r.bookingId === booking.bookingId)?.rating} ★
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showReviewModal && (
        <ReviewModal
          booking={reviewBooking}
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
};

export default BookTicket;