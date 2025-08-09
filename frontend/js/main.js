/*
 * This code initializes the Leaflet map and brings in static geojson files which do not need to be updated
 * 
 * Author: Jacob Kampf
 * Last edited: 8/8/2025
 */

//Global variables
var map;

window.onload = function(e) {
  // Initialize map
  map = L.map('map').setView([44.95, -93.09], 12);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  addStaticLayers();
}

function addStaticLayers() {

  fetch('./geojson/retail_game.geojson')
    .then(response => response.json())
    .then(data => {
      L.geoJSON(data, {
        onEachFeature: (feature, layer) => {
          // Customize popup content as needed
          let popupContent = `${feature.properties.name }`;
          layer.bindPopup(popupContent);
        },
        style: feature => ({
          color: 'blue',
          weight: 2,
          fillOpacity: 1
        })
      }).addTo(map);
    })
    .catch(err => console.error('Error loading GeoJSON:', err));

}
