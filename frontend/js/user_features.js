/**
 * This file sets up user features in the app
 * Locate Me, filtering, search, and submitting wait times and thrill ratings
 * 
 * Author: Jacob Kampf
 * Last edited: 8/10/2025
 */

function addUserFunctionality() {

    addLocateButton();
    
    addSearch();
}

function addLocateButton() {
    L.control.locate().addTo(map);
    return
}

function addSearch() {
    var searchLayer = L.layerGroup().addTo(map);
    
    searchLayer.addLayer(ridesLayer);
    searchLayer.addLayer(diningLayer);
    console.log('cech')

    console.log('chck')

    map.addControl(new L.Control.Search({layer: searchLayer}));
    console.log('chyeck')
}
