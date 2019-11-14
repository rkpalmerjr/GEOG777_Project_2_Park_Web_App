/* Kevin Palmer, UW-Madison, GEOG777, Fall 2019, Project 2 */

// Define basemap tilesets
var streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHNteXRoMiIsImEiOiJjaXNmNGV0bGcwMG56MnludnhyN3Y5OHN4In0.xsZgj8hsNPzjb91F31-rYA', {
        maxZoom: 21,
        id: 'mapbox.streets',
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
    }),
    imagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 21,
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

// Create the map
var map = L.map('map', {
    zoomControl: false, // disable default leaflet zoom controls
    center: [38.872778, -77.0075],
    zoom: 16,
    minZoom: 12,
    maxZoom: 21,
    layers: [imagery]
});

// Add zoom home button controls
var zoomHome = L.Control.zoomHome();
zoomHome.addTo(map);

// Create basemap tileset layers
var baseMaps = {
    "OSM Streets (Mapbox)": streets,
    "Imagery (Esri)": imagery
};

// Add layers control to the map
var layerControl = L.control.layers(baseMaps);
layerControl.addTo(map);
$('<p class = "controlHeader">Basemap Tilesets</p>').insertBefore('div.leaflet-control-layers-base');

// Add locator
L.control.locate().addTo(map);

// a Leaflet marker is used by default to symbolize point features.
L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/0'
}).addTo(map);

// a Leaflet marker is used by default to symbolize point features.
L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/1'
}).addTo(map);

// a Leaflet marker is used by default to symbolize point features.
L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/2'
}).addTo(map);

// a Leaflet marker is used by default to symbolize point features.
L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/3'
}).addTo(map);

// a Leaflet marker is used by default to symbolize point features.
L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/4'
}).addTo(map);

// a Leaflet marker is used by default to symbolize point features.
L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/5'
}).addTo(map);

// a Leaflet marker is used by default to symbolize point features.
L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/6'
}).addTo(map);

// a Leaflet marker is used by default to symbolize point features.
L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/7'
}).addTo(map);

// a Leaflet marker is used by default to symbolize point features.
L.esri.featureLayer({
    url: 'https://localhost:6443/arcgis/rest/services/GEOG777_Project_2/NatsPark/MapServer/8'
}).addTo(map);