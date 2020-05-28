// GETTING THE DATA
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

d3.json(url, function(data) {
    console.log(data.features);

    d3.json("static/data/PB2002_boundaries.json", function (plates){
        console.log(plates);

        // MARKER GROUP FOR MAGNITUDES
        var locMarkersOne = [];
        var locMarkersTwo = [];
        var locMarkersThree = [];
        var locMarkersFour = [];
        var locMarkersFive = [];

        for (var i=0; i<data.features.length; i++) {
            var tempMag = data.features[i].properties.mag;
            if (tempMag <= 1) {
                locMarkersOne.push(
                    L.circleMarker([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], 
                    {
                        color: "black",
                        fillColor: "#31a354",
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
                        fillColor: "#ffeda0",
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
                        fillColor: "#fdae6b",
                        weight: 1,
                        fillOpacity: 0.8,
                        radius: data.features[i].properties.mag * 4
                    }).bindPopup(data.features[i].properties.place + "<hr>" + "Magnitude: " + data.features[i].properties.mag
                        + "<hr>" + "Date: " + new Date(data.features[i].properties.time))
                    );

            } else if (tempMag <= 4) {
                locMarkersFour.push(
                    L.circleMarker([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], 
                        {
                            color: "black",
                            fillColor: "#e6550d",
                            weight: 1,
                            fillOpacity: 0.8,
                            radius: data.features[i].properties.mag * 4
                        }).bindPopup(data.features[i].properties.place + "<hr>" + "Magnitude: " + data.features[i].properties.mag
                        + "<hr>" + "Date: " + new Date(data.features[i].properties.time))
                    );
            } else {
                locMarkersFive.push(
                    L.circleMarker([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], 
                        {
                            color: "black",
                            fillColor: "#de2d26",
                            weight: 1,
                            fillOpacity: 1,
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
        var groupFive = L.layerGroup(locMarkersFive);

        // GETTING THE TECTONIC PLATES
        var mapStyle = {
            color: "#c51b8a",
            weight:1.2,
        };

        var geoPlates = L.geoJson(plates, {
            style: mapStyle
        });
    

        //BASE MAPS
        var satellitemap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/satellite-v9',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: "pk.eyJ1IjoiY2hhcmNvcyIsImEiOiJja2FuNXE5YXUxbGRyMnFuc3c5dzRkamkxIn0.2IEQgoBPJmtVyxaXuGxBAQ"
        });

        var outdoorsmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/outdoors-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: "pk.eyJ1IjoiY2hhcmNvcyIsImEiOiJja2FuNXE5YXUxbGRyMnFuc3c5dzRkamkxIn0.2IEQgoBPJmtVyxaXuGxBAQ"
        });

        var darkmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/dark-v10',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: "pk.eyJ1IjoiY2hhcmNvcyIsImEiOiJja2FuNXE5YXUxbGRyMnFuc3c5dzRkamkxIn0.2IEQgoBPJmtVyxaXuGxBAQ"
        });

        // GATHER THE BASEMAPS
        var baseMaps = {
            "Satellite": satellitemap,
            "Outdoors": outdoorsmap,
            "Dark": darkmap
        };

        // SETTING THE OVERLAYS WHICH WILL BE THE INFO TO DISPLAY
        var overlays = {
            "Magnitude 0-1": groupOne,
            "Magnitude 1-2": groupTwo,
            "Magnitude 2-3": groupThree,
            "Magnitude 3-4": groupFour,
            "Magnitude +4": groupFive,
            "Tectonic Plates": geoPlates
        };

    
        // ADD ALL LAYERS TO MAP
        var myMap = L.map("map", {
            layers: [satellitemap, groupOne, groupTwo, groupThree, groupFour, groupFive, geoPlates]
        }).setView([0,0], 2.4);

        // ADD LEGEND WITH CONTROL LAYERS
        L.control.layers(baseMaps, overlays, {collapsed:false}).addTo(myMap);

        // SETUP LEGEND AND INFO INSIDE
        var legend = L.control({ position: "bottomright" });
        legend.onAdd = function(yMmap) {
            var div = L.DomUtil.create("div", "legend");
        
            div.innerHTML += "<b>Earthquake Magnitude</b><br>";
            div.innerHTML += '<i class="square" style="background:#31a354"></i> <span>Magnitude 0-1</span> <br>';
            div.innerHTML += '<i class="square" style="background:#ffeda0"></i> <span>Magnitude 1-2</span> <br>';
            div.innerHTML += '<i class="square" style="background:#fdae6b"></i> <span>Magnitude 2-3</span> <br>';
            div.innerHTML += '<i class="square" style="background:#e6550d"></i> <span>Magnitude 3-4</span> <br>';
            div.innerHTML += '<i class="square" style="background:red"></i> <span>Magnitude +4</span> <br>';

            return div;
        };

        // ADD LEGEND TO MAP
        legend.addTo(myMap);
    
    });

});
