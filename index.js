
// if ("geolocation" in navigator) {
//   console.log("geolocation available");
//   navigator.geolocation.getCurrentPosition((position) => {
//     lat = position.coords.latitude;
//     lon = position.coords.longitude;
//     console.log(lat, lon);

// setView([lat, lon], 17)

const mymap = L.map("mymap", {
  minZoom: 0,   //setting zoom levels
  maxZoom: 18
}).fitWorld();
// const attribution =
//   '&copy; <a href="https://www.openstreetmap.org/copyright">habitus</a>';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl);
tiles.addTo(mymap);
// L.easyButton('<img src="/lib/assets/location.svg" style="width:16px">', function(btn, map){
//     helloPopup.setLatLng(mymap.getCenter()).openOn(mymap);
// }).addTo(mymap);
mymap.locate({ setView: true, maxZoom: 16 });
function onLocationFound(e) {
  L.marker(e.latlng).addTo(mymap)
    .bindPopup(`<b>Your Location</b> latitutde:${e.latitude.toFixed(5)} longitude:${e.longitude.toFixed(5)}`).openPopup();
}
mymap.on('locationfound', onLocationFound);

function onLocationError(e) {
  alert(e.message);
}
mymap.on('locationerror', onLocationError);
// //adding here
// var vectorTiles = {};
// var allEnums = [
//   'ArcGIS:Streets',
//   'ArcGIS:StreetsNight',
//   'OSM:Streets',
//   'OSM:Standard'
// ];
// const apiKey = "AAPKaa330c1f8f5b469b8e25bf5742edc9d4ZSdJcDff4_60kblmSTkPHnk8SfnJ8sI8ff5noazKSULBoE5spVbiuwkkoMt-zOhn";
// vectorTiles.Default = L.esri.Vector.vectorBasemapLayer(null, {
//   apiKey: apiKey
// });
// allEnums.forEach((enumString) => {
//   vectorTiles[
//     enumString
//   ] = L.esri.Vector.vectorBasemapLayer(enumString, {
//     apiKey: apiKey
//   });
// });

// L.control
//   .layers(vectorTiles, null, {
//     collapsed: false
//   })
//   .addTo(mymap);

// vectorTiles.Default.addTo(mymap);

// var streets = L.tileLayer(tileUrl, { id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: attribution });
// //add street view
// var baseMaps = {
//   "OpenStreetMap": tiles,
//   "Mapbox Streets": streets
// };
// var layerControl = L.control.layers(baseMaps).addTo(mymap);


//adding here marker of my location
// var marker = L.marker([lat, lon], { pmIgnore: true }).addTo(mymap);

//pop up for the location
// marker
//   .bindPopup(
//     `<b>Your Location</b> latitutde:${lat.toFixed(5)} longitude:${lon.toFixed(5)}`
//   )
//   .openPopup();

//add map scale
L.control.scale({ position: "bottomright" }).addTo(mymap);

// //leaflet measure
let measure = L.control.measure({
  primaryAreaUnit: 'sqmeters',
  primaryLengthUnit: 'meters',
  activeColor: "#3D535D",
  captureZIndex: 10000
}).addTo(mymap);
mymap.on('measurefinish', function (e) {
  console.log(e)
});
// measure.setStyle({className:'myMeasure'});

// //search buTton
// L.Control.geocoder().addTo(mymap);

// // lat and long
var c = new L.Control.Coordinates();
c.addTo(mymap);
mymap.on('click', function (e) {
  console.log(e)
  c.setCoordinates(e);
});
// // //leaflet-geoman toolbar
// mymap.pm.addControls({
//   position: 'topleft',
//   drawCircle: false,
// });

//arcGIS search bar
var searchControl = L.esri.Geocoding.geosearch({
  position: 'topleft',
  placeholder: 'Type here',
  useMapBounds: false,
  providers: [L.esri.Geocoding.arcgisOnlineProvider({
    apikey: "AAPKaa330c1f8f5b469b8e25bf5742edc9d4ZSdJcDff4_60kblmSTkPHnk8SfnJ8sI8ff5noazKSULBoE5spVbiuwkkoMt-zOhn", // replace with your api key - https://developers.arcgis.com
    nearby: {
      lat: -33.8688,
      lng: 151.2093
    }
  })]
}).addTo(mymap);
var results = L.layerGroup().addTo(mymap);
searchControl.on('results', function (data) {
  results.clearLayers();
  for (var i = data.results.length - 1; i >= 0; i--) {
    results.addLayer(L.marker(data.results[i].latlng));
  }
});