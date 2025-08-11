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
}

function addSearch() {

    const searchLayerGroup = L.layerGroup();

    searchLayerGroup.addLayer(ridesLayer);
    searchLayerGroup.addLayer(diningLayer);

    const searchControl = new L.Control.Search({
        layer: searchLayerGroup,
        propertyName: 'name',
        zoom: 19
    });



    map.addControl(searchControl);
}
