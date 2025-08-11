/*
 * This code initializes the Leaflet map and brings in static geojson files which do not need to be updated
 * 
 * Author: Jacob Kampf
 * Last edited: 8/8/2025
 */

//Global variables
var map;
let ridesLayer;
let diningLayer;

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
 
  //Add rides GeoJSON layer
  loadRides();

  //Adds dining GeoJSON layer
  loadDining();

  //Adds different user functionality to map
  addUserFunctionality();
}

function addStaticLayers() {

  //Map panes to ensure correct layering
  map.createPane('sections');
  map.createPane('sidewalk');
  map.createPane('mainLayers');
  
  map.getPane('sections').style.zIndex = 400;
  map.getPane('sidewalk').style.zIndex = 450;
  map.getPane('mainLayers').style.zIndex = 650;
  


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
  
  //Retail and Game Locations GeoJSON
  fetch('./geojson/retail_game.geojson')
    .then(response => response.json())
    .then(data => {
      retailGamingLayer = L.geoJSON(data, {
        pointToLayer: retailPointToLayer,
        pane: 'mainLayers',
        onEachFeature: (feature, layer) => {
          // Customize popup content as needed
          let popupContent = `${feature.properties.name }`;
          layer.bindPopup(popupContent);
        },
      });
      retailGamingLayer.addTo(map);
    })
    .catch(err => console.error('Error loading GeoJSON:', err));

  //Retail and Game Locations GeoJSON
  fetch('./geojson/service.geojson')
    .then(response => response.json())
    .then(data => {
      L.geoJSON(data, {
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


async function loadRides() {
  try {
    const res = await fetch('https://geog777-proj2-backend.onrender.com/api/rides');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    ridesLayer = L.geoJSON(data, {
      pointToLayer: ridesPointToLayer,
      pane: 'mainLayers',
      onEachFeature: (feature, layer) => {
        let popupContent = `${feature.properties.name }`;
        layer.bindPopup(popupContent);
      }
    });
    ridesLayer.addTo(map);
  } catch (err) {
    console.error('Failed to load rides:', err);
  }
}

async function loadDining() {
  try {
    const res = await fetch('https://geog777-proj2-backend.onrender.com/api/dining');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    console.log(data);
    diningLayer = L.geoJSON(data, {
      pointToLayer: diningPointToLayer,
      pane: 'mainLayers',
      onEachFeature: (feature, layer) => {
        let popupContent = `${feature.properties.name }`;
        layer.bindPopup(popupContent);
      }
    })
    diningLayer.addTo(map);
  } catch (err) {
    console.error('Failed to load rides:', err);
  }
}

