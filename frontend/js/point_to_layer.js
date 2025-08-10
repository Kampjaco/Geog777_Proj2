/**
 * This file creates icon styles for the point layers
 * 
 * Author: Jacob Kampf
 * Last edited: 8/10/2025
 */

function servicePointToLayer(feature, latlng) {

    let service = feature.properties.type;
    let bgColor = 'lightblue'
    
    let icon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="
            background:${bgColor};
            border-radius:8px;
            padding:4px;
            display:flex;
            justify-content:center;
            align-items:center;
        ">
            <img src="icons/${feature.properties.type.split(' ')[0].toLowerCase()}.png" width="20" height="20">
        </div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });

    return L.marker(latlng, { icon: icon });     
}

function retailPointToLayer(feature, latlng) {
    return L.circleMarker(latlng, {
        radius: 8,            
        fillColor: '#800080', 
        color: '#4B004B',     
        weight: 2,            
        opacity: 1,           
        fillOpacity: 1,
        pane: 'mainLayers'        
    });
}

function ridesPointToLayer(feature, latlng) {
  return L.circleMarker(latlng, {
    radius: 8,
    fillColor: '#ff0000',   
    color: '#800000',       
    weight: 2,
    opacity: 1,
    fillOpacity: 1,
    pane: 'mainLayers'
  });
}
