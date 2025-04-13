// components/ItineraryPlanner.jsx
import React, { useState } from 'react';
import './ItineraryPlanner.css';

function ItineraryPlanner() {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState(3);
  const [interests, setInterests] = useState('');
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateItinerary = async () => {
    if (!destination) return;
    
    setLoading(true);
    try {
      // In a real implementation, you would call your backend API
      // which would then use the LLaMA 70B model to generate the itinerary
      const mockResponse = {
        itinerary: [
          `Day 1: Arrival in ${destination}. Explore the city center and visit local landmarks.`,
          `Day 2: Take a guided tour of ${destination}'s most famous attractions.`,
          `Day 3: Enjoy local cuisine and visit markets for souvenirs.`,
          ...(duration > 3 ? [`Day 4+: Custom activities based on your interests in ${interests || 'general tourism'}`] : [])
        ],
        recommendations: [
          `Try the local specialty restaurant near the main square`,
          `Visit the ${destination} Museum of History`,
          `Take a sunset walk along the river`
        ]
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setItinerary(mockResponse);
    } catch (error) {
      console.error('Error generating itinerary:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="itinerary-planner">
      <h2>Plan Your Perfect Trip</h2>
      <div className="planner-form">
        <div className="form-group">
          <label>Destination:</label>
          <input 
            type="text" 
            value={destination} 
            onChange={(e) => setDestination(e.target.value)} 
            placeholder="Where do you want to go?"
          />
        </div>
        
        <div className="form-group">
          <label>Duration (days):</label>
          <input 
            type="number" 
            min="1" 
            max="14" 
            value={duration} 
            onChange={(e) => setDuration(parseInt(e.target.value))}
          />
        </div>
        
        <div className="form-group">
          <label>Interests (optional):</label>
          <input 
            type="text" 
            value={interests} 
            onChange={(e) => setInterests(e.target.value)} 
            placeholder="e.g., hiking, museums, food"
          />
        </div>
        
        <button onClick={generateItinerary} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Itinerary'}
        </button>
      </div>
      
      {itinerary && (
        <div className="itinerary-results">
          <h3>Your {duration}-Day {destination} Itinerary</h3>
          <ul>
            {itinerary.itinerary.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          
          <h4>Recommended Activities</h4>
          <ul className="recommendations">
            {itinerary.recommendations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ItineraryPlanner;