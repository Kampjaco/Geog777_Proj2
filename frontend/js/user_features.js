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
    console.log('hi')
    return
}

function addSearch() {
    const searchLayerGroup = L.layerGroup()
    searchLayerGroup.addLayer(diningLayer)

    const searchControl = new L.Control.Search({
        layer: diningLayer,
        propertyName: 'Name'
    });

    map.addControl(searchControl);
}
