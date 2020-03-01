/* Kevin Palmer, UW-Madison, GEOG777, Fall 2019, Project 2 */


// Define the map div
var map = L.map('map', {
    zoomControl: false, // disable default leaflet zoom controls
    center: [38.872778, -77.0075],
    zoom: 13,
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
}).addTo(map); //Default basemap is streets
var imagery = L.esri.basemapLayer(('Imagery'), {
    // detectRetina: true,
    maxZoom: 21,
});


// Define basemap tileset layers
var baseMaps = {
    "Street Map": streets,
    "Imagery": imagery
};


// Define Marker Icons
var natsIcon = L.icon({
    iconUrl: 'img/Washington-Nationals-Marker.svg',
    iconSize: [45, 45] 
});
var merchIcon = L.icon({
    iconUrl: 'img/clothing-store-15.svg',
    iconSize: [25, 25]
});
var snacksIcon = L.icon({
    iconUrl: 'img/confectionery-15.svg',
    iconSize: [25, 25]
});
var grillIcon = L.icon({
    iconUrl: 'img/fast-food-15.svg',
    iconSize: [25, 25]
});
var vegetarianIcon = L.icon({
    iconUrl: 'img/garden-15.svg',
    iconSize: [25, 25]
});
var iceCreamIcon = L.icon({
    iconUrl: 'img/ice-cream-15.svg',
    iconSize: [25, 25]
});
var premiumIcon = L.icon({
    iconUrl: 'img/restaurant-15.svg',
    iconSize: [25, 25]
});
var pizzaIcon = L.icon({
    iconUrl: 'img/restaurant-pizza-15.svg',
    iconSize: [25, 25]
});
var seafoodIcon = L.icon({
    iconUrl: 'img/restaurant-seafood-15.svg',
    iconSize: [25, 25]
});
var beerIcon = L.icon({
    iconUrl: 'img/beer-15.svg',
    iconSize: [25, 25]
});
var toiletManIcon = L.icon({
    iconUrl: 'img/toilet-man-15.svg',
    iconSize: [20, 20]
});
var toiletWomanIcon = L.icon({
    iconUrl: 'img/toilet-woman-15.svg',
    iconSize: [20, 20]
});
var toiletFamilyIcon = L.icon({
    iconUrl: 'img/toilet-family-15.svg',
    iconSize: [20, 20]
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
var merch = L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/2',
    minZoom: 15,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: merchIcon
        });
    }
});
merch.bindPopup(function (layer) {
    return L.Util.template('<p><strong>{name} - Section {section}</strong></p>', layer.feature.properties);
});
var food = L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/3',
    minZoom: 15,
    pointToLayer: function (feature, latlng) {
        if (feature.properties.type == 'Snacks') {
            return L.marker(latlng, {
                icon: snacksIcon
            });
        }
        if (feature.properties.type == 'Grill') {
            return L.marker(latlng, {
                icon: grillIcon
            });
        }
        if (feature.properties.type == 'Vegetarian') {
            return L.marker(latlng, {
                icon: vegetarianIcon
            });
        }
        if (feature.properties.type == 'Ice Cream') {
            return L.marker(latlng, {
                icon: iceCreamIcon
            });
        }
        if (feature.properties.type == 'Premium') {
            return L.marker(latlng, {
                icon: premiumIcon
            });
        }
        if (feature.properties.type == 'Pizza') {
            return L.marker(latlng, {
                icon: pizzaIcon
            });
        }
        if (feature.properties.type == 'Seafood') {
            return L.marker(latlng, {
                icon: seafoodIcon
            });
        }
    }
});
food.bindPopup(function (layer) {
    return L.Util.template('<p><strong>{name} - {type} - Section {section}</strong></p>', layer.feature.properties);
});
var beer = L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/4',
    minZoom: 15,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: beerIcon
        });
    }
});
beer.bindPopup(function (layer) {
    return L.Util.template('<p><strong>{name} - Section {section} - Beer Brands: {brands}</strong></p>', layer.feature.properties);
});
var restrooms = L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/5',
    minZoom: 15,
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
restrooms.bindPopup(function (layer) {
    return L.Util.template('<p><strong>{type} Restroom - Section {section}</strong></p>', layer.feature.properties);
});
var sectionsGroup = L.featureGroup();
var sectionsLabels = L.featureGroup();
var sections = L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/7',
    minZoom: 14,
    style: {
        color: 'red',
        fillOpacity: '0.25',
        weight: '1'
    },
    minZoom: 15,
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
sections.bindPopup(function (layer) {
    return L.Util.template('<p><strong>Section: {section}</strong></p>', layer.feature.properties);
});
sectionsGroup.addTo(map);
var gate = L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/1',
    minZoom: 15,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: gateIcon
        });
    }
}).addTo(map);
gate.bindPopup(function (layer) {
    return L.Util.template('<p><strong>{name}</strong></p>', layer.feature.properties);
});
var publicTrans = L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/0',
    minZoom: 14,
    pointToLayer: function(feature, latlng) {
        if (feature.properties.type == 'Metrorail') {
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
publicTrans.bindPopup(function (layer) {
    return L.Util.template('<p><strong>{name}</strong></p>', layer.feature.properties);
});
var parkingGroup = L.featureGroup();
var parkingPoint = L.featureGroup();
var parkingPoly = L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/6',
    minZoom: 14,
    style: {
        color: 'black',
        fillOpacity: '0.25',
        weight: '1'
    },
    onEachFeature: function (feature, layer) {
        var bounds = layer.getBounds();
        var center = bounds.getCenter();
        var marker = L.marker(center, {
            icon: parkingIcon,
            clickable: false // This doesn't seem to work
        }).addTo(parkingPoint);
    }
}).addTo(parkingGroup);
parkingPoly.bindPopup(function (layer) {
    return L.Util.template('<p><strong>{name}</strong></p>', layer.feature.properties);
});
parkingPoint.addTo(parkingGroup);
parkingGroup.addTo(map);
var parkGroup = L.featureGroup();
var parkPoint = L.featureGroup();
var parkBoundary = L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/8',
    style: {
        color: 'red',
        fillOpacity: '0.05',
        weight: '.75'
    },
    onEachFeature: function (feature, layer) {
        var bounds = layer.getBounds();
        var center = bounds.getCenter();
        var marker = L.marker(center, {
            icon: natsIcon,
        }).addTo(parkPoint);
    }
}).addTo(parkGroup);
parkGroup.addTo(map);
parkPoint.addTo(map);


// Min zoom control for section labels
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
    if (zoomlevel < 14) {
        if (map.hasLayer(parkingPoint)) {
            map.removeLayer(parkingPoint);
        } else {
            console.log("No layer active")
        }
    }
    if (zoomlevel >= 14) {
        if (map.hasLayer(parkingPoint)) {
            console.log("Layer already added");
        } else {
            map.addLayer(parkingPoint);
        }
    }
    if (zoomlevel >= 14) {
        if (map.hasLayer(parkPoint)) {
            map.removeLayer(parkPoint);
        } else {
            console.log("No layer active")
        }
    }
    if (zoomlevel < 14) {
        if (map.hasLayer(parkPoint)) {
            console.log("Layer already added");
        } else {
            map.addLayer(parkPoint);
        }
    }
    console.log("Current Zoom Level = " + zoomlevel);
});


// Define overlay layers
var groupedOverlays = {
    "Concessions and Restrooms": {
        "Merchandise": merch,
        "Food": food,
        "Craft Beer": beer,
        "Restrooms": restrooms
    },
    "Seats, Gates, Transportation": {
        "Seat Sections": sectionsGroup,
        "Gates": gate,
        "Public Transportation": publicTrans,
        "Parking": parkingGroup,
        "Nats Park Boundary": parkBoundary
    }
};


// Add basemap/overlay layers control to the map
// https://github.com/ismyrnow/leaflet-groupedlayercontrol
var layerControl = L.control.groupedLayers(baseMaps, groupedOverlays);
layerControl.addTo(map);
$('<p class = "controlHeader" style="margin-bottom: 8px"><b>Basemaps</b></p>').insertBefore('div.leaflet-control-layers-base');


// Search Control
// https://esri.github.io/esri-leaflet/examples/geocoding-control.html
// http://esri.github.io/esri-leaflet/api-reference/controls/geosearch.html
// https://esri.github.io/esri-leaflet/examples/search-feature-layer.html
// var arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider();

// NOTE:  "searchFields" seems to only work with string fields

var searchControl = L.esri.Geocoding.geosearch({
    position: 'bottomright',
    useMapBounds: false,
    collapseAfterResult: false,
    expanded: true,
    placeholder: 'Search here for things (food, beer, restrooms, etc.)',
    providers: [
        // arcgisOnline, // Address geocoder
        L.esri.Geocoding.featureLayerProvider({
            url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/2',
            searchFields: ['tags', 'name'],
            label: 'Merchandise',
            maxResults: 100,
            bufferRadius: 50,
            formatSuggestion: function (feature) {
                return feature.properties.name + " - Section " + feature.properties.section + " - " + feature.properties.concourse + " Concourse"
            }
        }),
        L.esri.Geocoding.featureLayerProvider({
            url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/3',
            searchFields: ['tags', 'name', 'type'],
            label: 'Food',
            maxResults: 100,
            bufferRadius: 50,
            formatSuggestion: function (feature) {
                return feature.properties.name + " - " + feature.properties.type + " - Section " + feature.properties.section + " - " + feature.properties.concourse + " Concourse"
            }
        }),
        L.esri.Geocoding.featureLayerProvider({
            url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/4',
            searchFields: ['tags', 'name', 'brands'],
            label: 'Beer',
            maxResults: 100,
            bufferRadius: 50,
            formatSuggestion: function (feature) {
                return feature.properties.name + " - Section " + feature.properties.section + " - " + feature.properties.concourse + " Concourse"
            }
        }),
        L.esri.Geocoding.featureLayerProvider({
            url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/5',
            searchFields: ['tags', 'type'],
            label: 'Restrooms',
            maxResults: 100,
            bufferRadius: 50,
            formatSuggestion: function (feature) {
                return feature.properties.type + " - Section " + feature.properties.section
            }
        }),
        L.esri.Geocoding.featureLayerProvider({
            url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/6',
            searchFields: ['tags', 'section', 'location'],
            label: 'Seating Sections',
            maxResults: 100,
            bufferRadius: 50,
            formatSuggestion: function (feature) {
                return feature.properties.section + " - " + feature.properties.location + " - " + feature.properties.concourse + " Concourse"
            }
        }),
        L.esri.Geocoding.featureLayerProvider({
            url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/1',
            searchFields: ['tags', 'name'],
            label: 'Gates',
            maxResults: 100,
            bufferRadius: 50,
            formatSuggestion: function (feature) {
                return feature.properties.name
            }
        }),
        L.esri.Geocoding.featureLayerProvider({
            url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/0',
            searchFields: ['tags', 'name', 'type'],
            label: 'Public Transportation',
            maxResults: 100,
            bufferRadius: 50,
            formatSuggestion: function (feature) {
                return feature.properties.name + " - " + feature.properties.type
            }
        }),
        L.esri.Geocoding.featureLayerProvider({
            url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/7',
            searchFields: ['tags', 'name'],
            label: 'Parking',
            maxResults: 100,
            bufferRadius: 50,
            formatSuggestion: function (feature) {
                return feature.properties.name
            }
        })
    ]
}).addTo(map);


// Leaflet easy button
// https://github.com/CliffCloud/Leaflet.EasyButton
L.easyButton('fa-star', function () {
    alert('You just clicked the star button.\n\nThe submit review functionality is currently in development and not yet ready for use.\n\nUntil then...Make a wish!  A curly "W" maybe?');
}).addTo(map);


// Level/Concourse Control
// https://esri.github.io/esri-leaflet/examples/indoors.html
// Run a query against our Feature Layer (that we have not added to the map) to get a FeatureCollection (https://tools.ietf.org/html/rfc7946#section-3.3)
sections.query().run(function (error, featureCollection) {
    if (error) {
        return;
    }

    // console.log(featureCollection);
    var indoorLayer = new L.Indoor(featureCollection, {
        getLevel: function (feature) {
            // console.log(feature.properties.level);
            return feature.properties.level;
        }
    });
    // set the initial level to show
    indoorLayer.setLevel(1);
    // indoorLayer.addTo(map);

    // Add Level Control (code from https://github.com/cbaines/leaflet-indoor)
    var levelControl = new L.Control.Level({
        level: 1,
        levels: [1,2,3,4],
        position: "topleft"
    });

    // Connect the level control to the indoor layer
    // levelControl.addEventListener('levelchange', indoorLayer.setLevel, indoorLayer); // Disabled while in development
    levelControl.addEventListener('levelchange', function() {
       alert('You just clicked a level change control button.\n\nThe level change functionality is currently in development and not yet ready for use.\n\nUntil then please continue to enjoy using and exploring this app for the first level/main concourse.') 
    });
    levelControl.addTo(map);
});