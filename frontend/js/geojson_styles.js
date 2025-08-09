/**
 * This JS file provides styling for all GeoJSON files in the application
 * 
 * Author: Jacob Kampf
 * Last edited: 8/9/2025
 */

function sidewalkStyle(feature) {
    if(feature.properties.name == 'Valleyfair') {
        return {
            fillColor: '#B2B2B2',
            fillOpacity: 1,
            color: '#6E6E6E',
            weight: 0.7
        }
    }
    return {
            fillColor: '#B2B2B2',
            fillOpacity: 1,
            color: '#6E6E6E',
            weight: 1
    }
}

function sectionStyle(feature) {
    console.log(feature)
    if(feature.properties.section == 'Parking Lot') {
        return {
            fillColor: 'grey',
            fillOpacity: 0.1,
            color: '#000000',
            weight: 0.25 
        }
    }
    return {
        fillColor: '#ABCD66',
        fillOpacity: 1,       
        stroke: false         
    }
}

