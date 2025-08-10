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
  addDynamicLayers();
}

function addStaticLayers() {

  //Map panes to ensure correct layering
  map.createPane('sections');
  map.createPane('sidewalk');
  map.createPane('mainLayers');
  
  map.getPane('sections').style.zIndex = 400;
  map.getPane('sidewalk').style.zIndex = 450;
  map.getPane('mainLayers').style.zIndex = 650
  

  let sectionsLayer;
  //Sections GeoJSON
  fetch('./geojson/sections.geojson')
    .then(response => response.json())
    .then(data => {
      sectionsLayer = L.geoJSON(data, {
        style: sectionStyle,
        pane: 'sections'
      }).addTo(map);
    })
    .catch(err => console.error('Error loading GeoJSON:', err));

  let sidewalkLayer;
  //Sidewalk GeoJSON
  fetch('./geojson/sidewalk.geojson')
    .then(response => response.json())
    .then(data => {
      sidewalkLayer =L.geoJSON(data, {
        style: sidewalkStyle,
        pane: 'sidewalk'
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
        pane: 'mainLayers',
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
        pane: 'mainLayers',
        onEachFeature: (feature, layer) => {
          let popupContent = `${feature.properties.type }`;
          layer.bindPopup(popupContent);
        }
      }).addTo(map);
    })
    .catch(err => console.error('Error loading GeoJSON:', err));

}


function addDynamicLayers() {
 
  let ridesLayer;

  async function loadRides() {
    const response = await fetch('/api/rides');
    if (!response.ok) {
      console.error('Failed to load rides GeoJSON');
      return;
    }
    const data = await response.json();

    // Remove old layer if it exists
    if (ridesLayer) {
      map.removeLayer(ridesLayer);
    }

    ridesLayer = L.geoJSON(data, {
      onEachFeature: (feature, layer) => {
        const p = feature.properties;
        const wait = p.avg_wait_time === null ? 'Unknown' : p.avg_wait_time;
        const thrill = p.avg_thrill_rating === null ? '-' : p.avg_thrill_rating;
        const popupContent = `
          <strong>${p.name}</strong><br>
          Type: ${p.ride_type}<br>
          Section: ${p.section}<br>
          Uses Fastlane: ${p.uses_fastlane}<br>
          Avg Wait Time: ${wait} mins<br>
          Avg Thrill Rating: ${thrill}/10
        `;
        layer.bindPopup(popupContent);
      },
      pointToLayer: (feature, latlng) =>
        L.circleMarker(latlng, { radius: 6, color: 'red' }),
      style: feature => ({
        color: 'blue',
        weight: 2,
        opacity: 0.7,
        fillOpacity: 0.5
      })
    }).addTo(map);
  }

  loadRides();

}
