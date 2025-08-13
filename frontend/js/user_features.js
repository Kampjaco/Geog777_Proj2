/**
 * This file sets up user features in the app
 * Locate Me, search, and submitting wait times and thrill ratings
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

    //Updates popups
    if(searchControl) {
        map.remove(searchControl)
    }

    let searchLayerGroup = L.layerGroup();

    searchLayerGroup.addLayer(ridesLayer);
    searchLayerGroup.addLayer(diningLayer);

    const searchControl = new L.Control.Search({
        layer: searchLayerGroup,
        propertyName: 'name',
        marker: false,
        textPlaceholder: 'Search a Ride or Dining Venue',
        moveToLocation: function(latlng, title, map) {
            map.setView(latlng, 18);

            // Find the matched feature and open its popup
            searchLayerGroup.eachLayer(layer => {
                layer.eachLayer(featureLayer => {
                    if (featureLayer.feature?.properties?.name === title) {
                        featureLayer.openPopup();
                    }
                });
            });
        }
    });
    map.addControl(searchControl);
}

