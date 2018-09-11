// Google Map
var gmarkers = [];
var markers = [['', -20.168529, 57.485452 /*Belle Village*/], ['', -20.024509, 57.576280 /*Mont Choisy*/], ['', -20.327520, 57.383162 /*Tamarin*/], ['', -20.258659, 57.490749 /*Trianon*/],];

function initialize() {
    var latlng = new google.maps.LatLng(-20.168529, 57.485452);
    var settings = {
        zoom: 13,
        center: latlng,
        mapTypeControl: true,
        mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
        navigationControl: true,
        navigationControlOptions: { style: google.maps.NavigationControlStyle.DEFAULT },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        panControl: true,
        zoomControl: true,
        scaleControl: true,
        scrollwheel: true,
        streetViewControl: true,
        overviewMapControl: true,
        rotateControl: true
    };

    var map = new google.maps.Map(document.getElementById("map_canvas"), settings);
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    for (i = 0; i < markers.length; i++) {
        var pos = new google.maps.LatLng(markers[i][1], markers[i][2], markers[i][3], markers[i][4], markers[i][5], markers[i][6]);
        var mapPos = new google.maps.LatLng(-20.168159, 57.486726);
        var markerMoto = 'images/icn-logo/marker.png';
        marker = new google.maps.Marker({
            position: pos,
            icon: markerMoto,
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                map.setCenter(marker.getPosition());
                infowindow.setContent(markers[i][0]);
                /*infowindow.open(map, marker);*/
            }
        })(marker, i));
        gmarkers.push(marker);
    }

    var GreyStyle = [
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#444444"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#f2f2f2"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#dde6e8"
                },
                {
                    "visibility": "on"
                }
            ]
        }
    ];

    map.setOptions({ styles: GreyStyle });
}

function myClick(id) { google.maps.event.trigger(gmarkers[id], 'click'); } 
