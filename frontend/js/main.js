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
  map = L.map('map').setView([44.79873578568766, -93.45361939995553], 19);

  addStaticLayers();
}

function addStaticLayers() {

  let sectionsLayer;
  //Sections GeoJSON
  fetch('./geojson/sections.geojson')
    .then(response => response.json())
    .then(data => {
      sectionsLayer = L.geoJSON(data, {
        style: sectionStyle
      }).addTo(map);
      console.log(sectionsLayer)
    })
    .catch(err => console.error('Error loading GeoJSON:', err));

  let sidewalkLayer;
  //Sidewalk GeoJSON
  fetch('./geojson/sidewalk.geojson')
    .then(response => response.json())
    .then(data => {
      sidewalkLayer =L.geoJSON(data, {
        style: sidewalkStyle
      }).addTo(map);
    })
    .catch(err => console.error('Error loading GeoJSON:', err));
  

  let retailGameLayer;
  //Retail and Game Locations GeoJSON
  fetch('./geojson/retail_game.geojson')
    .then(response => response.json())
    .then(data => {
      retailGameLayer = L.geoJSON(data, {
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

  let serviceLocationLayer;
  //Retail and Game Locations GeoJSON
  fetch('./geojson/service.geojson')
    .then(response => response.json())
    .then(data => {
      serviceLocationLayer = L.geoJSON(data, {
        pointToLayer: servicePointToLayer,
        onEachFeature: (feature, layer) => {
          let popupContent = `${feature.properties.type }`;
          layer.bindPopup(popupContent);
        },
        style: feature => ({
          color: 'red',
          weight: 2,
          fillOpacity: 1
        })
      }).addTo(map);
    })
    .catch(err => console.error('Error loading GeoJSON:', err));

}
