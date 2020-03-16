// Init Map Function
function initMap() {

    // Setting Center of the Map
    var center = { lat: 21.983146, lng: 96.08444 };

    // Showing the map with center coordinates
    var map = new google.maps.Map(document.getElementById("multi-marker-map"), {
        zoom: 5,
        center: center
    });

    // Getting JSON file containing coordinates
    $.getJSON("maps-info.json", function(result) {
        for (let i = 0; i < result['data'].length; i++) {
            // Setting a new object that only containing coordinates
            var mapMarkers = {
                lat: result['data'][i].latitude,
                lng: result['data'][i].longitude
            };
            // console.log(mapMarkers);

            // Setting Markers
            var marker = new google.maps.Marker({ position: new google.maps.LatLng(mapMarkers.lat, mapMarkers.lng), map: map });
        }
    });
}
