/* Kevin Palmer, UW-Madison, GEOG777, Fall 2019, Project 2 */


// Create the map
var map = L.map('map', {
    zoomControl: false, // disable default leaflet zoom controls
    center: [38.872778, -77.0075],
    zoom: 16,
    minZoom: 12,
    maxZoom: 19,
});


// Add zoom home button
// https://github.com/torfsen/leaflet.zoomhome
var zoomHome = L.Control.zoomHome();
zoomHome.addTo(map);


// Add locator button
// https://github.com/domoritz/leaflet-locatecontrol
L.control.locate().addTo(map);


// Define basemap tilesets
var streets = L.esri.basemapLayer(('Streets'), {
    // detectRetina: true,
    maxZoom: 21,
}).addTo(map);
var imagery = L.esri.basemapLayer(('Imagery'), {
    // detectRetina: true,
    maxZoom: 21,
});


// Create basemap tileset layers
var baseMaps = {
    "Street Map": streets,
    "Imagery": imagery
};


// Marker Icons
var toiletManIcon = L.icon({
    iconUrl: 'img/toilet-man-15.svg',
    iconSize: [25, 25]
});
var toiletWomanIcon = L.icon({
    iconUrl: 'img/toilet-woman-15.svg',
    iconSize: [25, 25]
});
var toiletFamilyIcon = L.icon({
    iconUrl: 'img/toilet-family-15.svg',
    iconSize: [25, 25]
});
var gateIcon = L.icon({
    iconUrl: 'img/roadblock-15.svg',
    iconSize: [20,20]
});
var metroIcon = L.icon({
    iconUrl: 'img/rail-15.svg',
    iconSize:[20,20]
});
var bikeIcon = L.icon({
    iconUrl: 'img/bicycle-share-15.svg',
    iconSize: [20, 20]
});
var waterTaxiIcon = L.icon({
    iconUrl: 'img/ferry-15.svg',
    iconSize: [20, 20]
});
var parkingIcon = L.icon({
    iconUrl: 'img/parking-15.svg',
    iconSize: [18, 18]
});


// Define overlay layers
// var merch = L.esri.featureLayer({
//     url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/2'
// });
// var food = L.esri.featureLayer({
//     url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/3'
// });
var beer = L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/4'
});
var restrooms = L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/5',
    pointToLayer: function (feature, latlng) {
        if (feature.properties.type == 'Mens') {
            return L.marker(latlng, {
                icon: toiletManIcon
            });
        }
        if (feature.properties.type == 'Womens') {
            return L.marker(latlng, {
                icon: toiletWomanIcon
            });
        }
        if (feature.properties.type == 'Family') {
            return L.marker(latlng, {
                icon: toiletFamilyIcon
            });
        }
    }
});
var sectionsGroup = L.featureGroup();
var sectionsLabels = L.featureGroup();
var sections = L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/6',
    style: {
        color: 'red',
        fillOpacity: '0.25',
        weight: '1'
    },
    onEachFeature: function (feature, layer) {
        var bounds = layer.getBounds();
        var center = bounds.getCenter();
        var label = L.tooltip({
            permanent: true,
            direction: 'center',
            className: 'sectionText'
        })
        .setContent(feature.properties.section)
        .setLatLng(center);
        label.addTo(sectionsLabels);
    }
}).addTo(sectionsGroup);
sectionsGroup.addTo(map);
var gate = L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/1',
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: gateIcon
        });
    }
}).addTo(map);
var publicTrans = L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/0',
    pointToLayer: function(feature, latlng) {
        if (feature.properties.type == 'Metro') {
            return L.marker (latlng, {
                icon: metroIcon
            });
        }
        if (feature.properties.type == 'Bikeshare') {
            return L.marker(latlng, {
                icon: bikeIcon
            });
        }
        if (feature.properties.type == 'Water Taxi') {
            return L.marker(latlng, {
                icon: waterTaxiIcon
            });
        }
    }
}).addTo(map);
var parkingGroup = L.featureGroup();
var parking = L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/7',
    style: {
        color: 'black',
        fillOpacity: '0.25',
        weight: '1'
    },
    onEachFeature: function (feature, layer) {
        var bounds = layer.getBounds();
        var center = bounds.getCenter();
        var marker = L.marker(center, {
            icon: parkingIcon
        }).addTo(parkingGroup);
    }
}).addTo(parkingGroup);
parkingGroup.addTo(map);
var parkBoundary = L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/8',
    style: {
        color: 'red',
        fillOpacity: '0.05',
        weight: '.75'
    }
}).addTo(map);


// Min zoom control for labels
// https://gis.stackexchange.com/questions/182628/leaflet-layers-on-different-zoom-levels-how
map.on('zoomend', function () {
    var zoomlevel = map.getZoom();
    if (zoomlevel < 19) {
        if (sectionsGroup.hasLayer(sectionsLabels)) {
            sectionsGroup.removeLayer(sectionsLabels);
        } else {
            console.log("No layer active")
        }
    }
    if (zoomlevel >= 19) {
        if (sectionsGroup.hasLayer(sectionsLabels)) {
            console.log("Layer already added");
        } else {
            sectionsGroup.addLayer(sectionsLabels);
        }
    }
    console.log("Current Zoom Level = " + zoomlevel);
});


// Create overlay layers
var overlays = {
    // "Merchandise": merch,
    // "Food": food,
    "Beer": beer,
    "Restrooms": restrooms,
    "Seat Sections": sectionsGroup,
    "Gates": gate,
    "Public Transportation": publicTrans,
    "Parking": parkingGroup,
    "Nats Park Boundary": parkBoundary
};


// Add layers control to the map
var layerControl = L.control.layers(baseMaps, overlays);
layerControl.addTo(map);
$('<p class = "controlHeader"><b>Basemaps</b></p>').insertBefore('div.leaflet-control-layers-base');
$('<p class = "controlHeader"><b>Layers</b></p>').insertBefore('div.leaflet-control-layers-overlays');


// // Create labels for layers (esri leaflet)
// // https://esri.github.io/esri-leaflet/examples/labeling-features.html
// var labels = {};

// sections.on('createfeature', function (e) {
//     var id = e.feature.id;
//     var feature = sections.getFeature(id);
//     var center = feature.getCenter();
//     var label = L.marker(center, {
//         icon: L.divIcon({
//             iconSize: null,
//             className: 'label',
//             html: '<div>' + e.feature.properties.section + '</div>'
//         })
//     }).addTo(map);
//     labels[id] = label;
// });

// sections.on('addfeature', function (e){
//     var label = labels[e.feature.id];
//     if (label) {
//         label.addTo(map);
//     }
// });

// sections.on('removefeature', function (e) {
//     var label = labels[e.feature.id];
//     if (label) {
//         map.removeLayer(label);
//     }
// });


// Create labels for layers (leaflet plugin)
// https://github.com/Leaflet/Leaflet.label


// Search Control
// https://esri.github.io/esri-leaflet/examples/geocoding-control.html
// http://esri.github.io/esri-leaflet/api-reference/controls/geosearch.html
// https://esri.github.io/esri-leaflet/examples/search-feature-layer.html
// var arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider();

var searchControl = L.esri.Geocoding.geosearch({
    position: 'bottomright',
    useMapBounds: false,
    collapseAfterResult: false,
    expanded: true,
    placeholder: 'Search here for things (sections, beer, restrooms, etc.)',
    providers: [
        // arcgisOnline, // Address geocoder
        L.esri.Geocoding.featureLayerProvider({
            url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/4',
            searchFields: ['name'],
            label: 'Beer',
            maxResults: 100,
            bufferRadius: 50,
            formatSuggestion: function (feature) {
                return feature.properties.name + " - Section " + feature.properties.location.toString()
            }
        }),
        L.esri.Geocoding.featureLayerProvider({
            url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/5',
            searchFields: ['type'], // Search field seems to only work with string fields
            label: 'Restrooms',
            maxResults: 100,
            bufferRadius: 50,
            formatSuggestion: function (feature) {
                return feature.properties.type + " - Section " + feature.properties.location
            }
        }),
        L.esri.Geocoding.featureLayerProvider({
            url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/6',
            searchFields: ['section', 'location'],
            label: 'Seating Sections',
            maxResults: 100,
            bufferRadius: 200,
            formatSuggestion: function (feature) {
                return feature.properties.section + " - " + feature.properties.location
            }
        })
    ]
}).addTo(map);


// // Level/Concourse Control
// // https://esri.github.io/esri-leaflet/examples/indoors.html
// // Run a query against our Feature Layer (that we have not added to the map) to get a FeatureCollection (https://tools.ietf.org/html/rfc7946#section-3.3)
// sections.query().run(function (error, featureCollection) {
//     if (error) {
//         return;
//     }

//     var indoorLayer = new L.Indoor(featureCollection, {
//         getLevel: function (feature) {
//             return feature.properties.concourse;
//         }
//     });
//     // set the initial level to show
//     indoorLayer.setLevel('Main');
//     indoorLayer.addTo(map);

//     // Add Level Control (code from https://github.com/cbaines/leaflet-indoor)
//     var levelControl = new L.Control.Level({
//         level: 'Main',
//         levels: indoorLayer.getLevels()
//     });

//     // Connect the level control to the indoor layer
//     levelControl.addEventListener('levelchange', indoorLayer.setLevel, indoorLayer);

//     levelControl.addTo(map);
// });