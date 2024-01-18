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
    if (coordinates <= 10 && coordinates >=-10) return "#bfff00";
    else if (coordinates > 10 && coordinates <=30) return "	#ffff00";
    else if (coordinates > 30 && coordinates <=50) return "	#ffbf00";
    else if (coordinates > 50 && coordinates <=70) return "	#ff8000";
    else if (coordinates > 70 && coordinates <=90) return "#ff4000";
    else return "#ff0000";
  }


// Get the data with d3.
d3.json(url).then(function(geoJsonData) {

  var heatLayer = L.geoJSON(geoJsonData, {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, {
            radius: feature.properties.mag * 5,
            fillColor: chooseColor(feature.geometry.coordinates[2]),
            color: '#000',
            weight: 3,
            opacity: 1,
            fillOpacity: 0.8
          });
        },
        onEachFeature: function(feature, layer) {
          layer.bindPopup("<h1>" + feature.properties.title + "</h1>");
        },
  }).addTo(myMap);

  // Set up the legend.
// Define legend control and add it to the map
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (myMap) {
    var div = L.DomUtil.create('div', 'info legend');
    // Add legend content here
    return div;
};

legend.addTo(myMap);

// Define the legend labels and colors based on altitude range
function getColor(d) {
  return d > 10000 ? '#f06b6b' :
         d > 5000  ? '#f0936b' :
         d > 2000  ? '#f3ba4e' :
         d > 1000  ? '#f3db4c' :
                     '#45b29d';
}

// Add legend content dynamically based on altitude range
legend.onAdd = function (myMap) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1000, 2000, 5000, 10000],
        labels = [];

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};
 });