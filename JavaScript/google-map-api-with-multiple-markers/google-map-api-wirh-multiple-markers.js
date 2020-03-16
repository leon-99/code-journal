// Init Map Function
function initMap() {

    // Setting Center of the Map
    let center = { lat: 21.983146, lng: 96.08444 };

    // Selcting the div to show the map
    let mapDiv = document.querySelector('map-div');

    // Showing the map with center coordinates
    let map = new google.maps.Map(mapDiv, {
        zoom: 5,
        center: center
    });

    // Getting JSON file containing coordinates
    $.getJSON("maps-info.json", function(result) {
        for (let i = 0; i < result['data'].length; i++) {
            // Setting a new object that only containing coordinates
            let mapMarkers = {
                lat: result['data'][i].latitude,
                lng: result['data'][i].longitude
            };
            // console.log(mapMarkers);

            // Setting Markers
            let marker = new google.maps.Marker({ position: new google.maps.LatLng(mapMarkers.lat, mapMarkers.lng), map: map });
        }
    });
}
