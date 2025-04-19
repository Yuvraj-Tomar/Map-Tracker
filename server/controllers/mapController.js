const axios = require('axios');

const getRoute = async (req, res) => {
  try {
    const { origin, destination, travelMode = 'driving' } = req.body;
    
 t
    if (!origin || !destination) {
      return res.status(400).json({ 
        error: 'Origin and destination are required',
        example: {
          origin: { lat: 40.7128, lng: -74.0060 },
          destination: { lat: 34.0522, lng: -118.2437 }
        }
      });
    }

 
    const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
      params: {
        origin: `${origin.lat},${origin.lng}`,
        destination: `${destination.lat},${destination.lng}`,
        mode: travelMode,
        alternatives: true,
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    });
    
    
    if (response.data.status !== 'OK') {
      return res.status(400).json({ 
        error: response.data.error_message || 'Failed to get directions',
        status: response.data.status 
      });
    }
    
    
    res.json({
      status: 'OK',
      routes: response.data.routes.map(route => ({
        overview_path: route.overview_path,
        legs: route.legs,
        distance: route.legs[0].distance,
        duration: route.legs[0].duration
      }))
    });
    
  } catch (error) {
    console.error('Error fetching directions:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
};

module.exports = {
  getRoute
};