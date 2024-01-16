let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
  });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

function chooseColor(coordinates) {
    if (coordinates <= 10 && coordinates >=-10) return "green";
    else if (coordinates > 10 && coordinates <=30) return "yellow";
    else if (coordinates > 30 && coordinates <=50) return "orange";
    else if (coordinates > 50 && coordinates <=70) return "red";
    else if (coordinates > 70 && coordinates <=90) return "purple";
    else return "black";
  }
// Get the data with d3.
d3.json(url).then(function(geoJsonData) {

  var heatLayer = L.geoJSON(geoJsonData, {
        pointToLayer: function (feature, coordinate) {
          return L.circleMarker(coordinate, {
            radius: feature.properties.mag * 5,
            fillColor: chooseColor(feature.point.coordinates[2]),
            color: '#000',
            weight: 3,
            opacity: 1,
            fillOpacity: 0.8
          });
        }
      }).addTo(myMap);
  
  
    // Add our marker cluster layer to the map.
   
  
  });