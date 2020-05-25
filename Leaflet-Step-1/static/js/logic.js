// API CALL TO ALL EARTHQUAKES IN THE PAST DAY
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

d3.json(url, function(data) {
    console.log(data.features);

    // MARKER GROUP FOR MAGNITUDES
    var locMarkersOne = [];
    var locMarkersTwo = [];
    var locMarkersThree = [];
    var locMarkersFour = [];

    for (var i=0; i<data.features.length; i++) {
        var tempMag = data.features[i].properties.mag;
        if (tempMag <= 1) {
            locMarkersOne.push(
                L.circleMarker([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], 
                {
                    color: "black",
                    fillColor: "green",
                    weight: 1,
                    fillOpacity: 0.8,
                    radius: data.features[i].properties.mag * 8
                }).bindPopup(data.features[i].properties.place + "<hr>" + "Magnitude: " + data.features[i].properties.mag
                    + "<hr>" + "Date: " + new Date(data.features[i].properties.time))
                );

        } else if (tempMag <= 2) {
            locMarkersTwo.push(
                L.circleMarker([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], 
                {
                    color: "black",
                    fillColor: "yellow",
                    weight: 1,
                    fillOpacity: 0.8,
                    radius: data.features[i].properties.mag * 6
                }).bindPopup(data.features[i].properties.place + "<hr>" + "Magnitude: " + data.features[i].properties.mag
                + "<hr>" + "Date: " + new Date(data.features[i].properties.time))
                );
        } else if (tempMag <= 3) {
            locMarkersThree.push(
                L.circleMarker([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], 
                {
                    color: "black",
                    fillColor: "orange",
                    weight: 1,
                    fillOpacity: 0.8,
                    radius: data.features[i].properties.mag * 4
                }).bindPopup(data.features[i].properties.place + "<hr>" + "Magnitude: " + data.features[i].properties.mag
                + "<hr>" + "Date: " + new Date(data.features[i].properties.time))
                );
        } else {
            locMarkersFour.push(
                L.circleMarker([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], 
                {
                    color: "black",
                    fillColor: "red",
                    weight: 1,
                    fillOpacity: 0.8,
                    radius: data.features[i].properties.mag * 4
                }).bindPopup(data.features[i].properties.place + "<hr>" + "Magnitude: " + data.features[i].properties.mag
                + "<hr>" + "Date: " + new Date(data.features[i].properties.time))
                );
        }
        
    };
    
    // SAVE AS GROUP
    var groupOne = L.layerGroup(locMarkersOne);
    var groupTwo = L.layerGroup(locMarkersTwo);
    var groupThree = L.layerGroup(locMarkersThree);
    var groupFour = L.layerGroup(locMarkersFour);

    //BASE MAP
    var lightmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/light-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "pk.eyJ1IjoiY2hhcmNvcyIsImEiOiJja2E4d3Q4Nm4wNHd5MnhuNWQ0dGpwazVxIn0.ZQvM0hJw0FBq0UbxH6_KyA"
    });

    // var baseMaps = {
    //     'Street Map': lightmap
    // };

    // var overlayMaps = {
    //     "Magnitude 0-1": groupOne,
    //     "Magnitude 1-2": groupTwo,
    //     "Magnitude 2-3": groupThree,
    //     "Magnitude +3": groupFour
    // }

    // ADD ALL LAYERS
    var myMap = L.map("map", {
        layers: [lightmap, groupOne, groupTwo, groupThree, groupFour]
    }).setView([0,0], 2);

    //L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(myMap)

    // SETUP LEGEND
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend");
        
        div.innerHTML += "<b>Earthquake Magnitude</b><br>";
        div.innerHTML += '<i class="square" style="background:green"></i> <span>Magnitude 0-1</span> <br>';
        div.innerHTML += '<i class="square" style="background:yellow"></i> <span>Magnitude 1-2</span> <br>';
        div.innerHTML += '<i class="square" style="background:orange"></i> <span>Magnitude 2-3</span> <br>';
        div.innerHTML += '<i class="square" style="background:red"></i> <span>Magnitude +3</span> <br>';

        return div;
    };

    legend.addTo(myMap);
    
});

