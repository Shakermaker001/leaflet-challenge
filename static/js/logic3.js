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
function chooseColor(cooridinate) {
    if (coordinate < 10) return "green";
    else if (coordinate < 30) return "yellow";
    else if (coordinate < 50) return "orange";
    else if (coordinate < 70) return "red";
    else if (coordinate < 90) return "purple";
    else return "black";
  }
// Get the data with d3.
d3.json(url).then(function(geoJsonData) {

  var heatLayer = L.geoJSON(geoJsonData, {
        pointToLayer: function (feature, point, cooridinate) {
          return L.circleMarker(cooridinate, {
            radius: feature.properties.mag * 5,
            fillColor: L.chooseColor(point.cooridinate.altitude),
            color: '#000',
            weight: 3,
            opacity: 1,
            fillOpacity: 0.8
          });
        }
      }).addTo(myMap);
  
  
    // Add our marker cluster layer to the map.
   
  
  });