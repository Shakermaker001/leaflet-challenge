
let quakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(quakeUrl).then (function (data) {
    createFeatures(data.features);
});

function createFeatures(quakeData) {

    
    function onEachFeature(point) {

      let marker = L.circle()
        marker.bindPopup(`<h1>${point.coordinates}</h1>`);
      }
    
      let quakes = L.geoJSON(quakeData, {
        onEachFeature: onEachFeature
      });
    
    
      createMap(quakes);
}

function createMap (quakes) {
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let baseMaps = {
    "Street Map": street
  };

  let overlayMaps = {
    Earthquakes: quakes
  };

  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, quakes]
  });


  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}


