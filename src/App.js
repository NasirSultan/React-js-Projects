// src/App.js
import React, { useEffect } from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl';

const App = () => {
  useEffect(() => {
    // Set your Mapbox Access Token
    mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

    // Initialize the map
    const map = new mapboxgl.Map({
      container: 'map', // The HTML element where the map will be rendered
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [-74.5, 40], // Initial map center [longitude, latitude]
      zoom: 9, // Initial zoom level
    });

    // Fetch a sample location data (or any relevant data you want)
    fetch('https://api.example.com/location') // Replace with your actual API URL
      .then(response => response.json())
      .then(data => {
        // Assuming the API returns { lat: number, lng: number }
        const { lat, lng } = data;

        // Add a marker to the map at the fetched location
        new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(map);
      })
      .catch(error => console.error('Error fetching location data:', error));
  }, []);

  return (
    <div className="App">
      <h1>Mapbox with React and Fetch API</h1>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};

export default App;
