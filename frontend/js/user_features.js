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

    const searchControl = new L.Control.Search({
        layer: diningLayer,
        propertyName: 'NAME'
    });



    map.addControl(searchControl);
}
