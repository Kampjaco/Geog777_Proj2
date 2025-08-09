function servicePointToLayer(feature, latlng) {

    let service = feature.properties.type;
    let bgColor = 'lightblue'
    
    let icon = L.divIcon({
        className: 'custom-div-icon', // override Leaflet defaults in CSS if needed
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