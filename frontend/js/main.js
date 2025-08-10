/*
 * This code initializes the Leaflet map and brings in static geojson files which do not need to be updated
 * 
 * Author: Jacob Kampf
 * Last edited: 8/8/2025
 */

//Global variables
var map;

window.onload = function(e) {

  //Bounding box
  var bounds = L.latLngBounds(
    [44.795445728284136, -93.46552743395252],
    [44.80152956759408, -93.4476906867284]
  )
  // Initialize map
  map = L.map('map', {
    center: [44.79873578568766, -93.45361939995553],
    zoom: 18,
    minZoom: 18,
    maxZoom: 20,
    maxBounds: bounds,
    maxBoundsViscosity: 1.0
  });

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
        pointToLayer: retailPointToLayer,
        onEachFeature: (feature, layer) => {
          // Customize popup content as needed
          let popupContent = `${feature.properties.name }`;
          layer.bindPopup(popupContent);
        },
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
        }
      }).addTo(map);
    })
    .catch(err => console.error('Error loading GeoJSON:', err));

}
