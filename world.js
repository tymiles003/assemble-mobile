/*
    ASSEMBLE Main Window Operator Module

    v0.0.1
    r.w. 2014

    Usage is subject to local regulations.

*/





    // Expose the object to global scope
    var World = {

    };

    // operational variables
    var worldObjectsCache = [],
        markerArray = [],
        circleArray = [];

    // declare icon objects
    // government buildings
    var govIcon = L.icon({
        iconUrl: 'assets/mapObjects/gov.png',
        iconSize: [44, 44],
        iconAnchor: [22, 22],
        popupAnchor: [0, -23]
    });
    // army location
    var armyIcon = L.icon({
        iconUrl: 'assets/mapObjects/army.png',
        iconSize: [44, 44],
        iconAnchor: [22, 22],
        popupAnchor: [0, -23]
    });
    // police locations
    var policeIcon = L.icon({
        iconUrl: 'assets/mapObjects/police.png',
        iconSize: [44, 44],
        iconAnchor: [22, 22],
        popupAnchor: [0, -23]
    });
    // riot police location
    var riotIcon = L.icon({
        iconUrl: 'assets/mapObjects/riot.png',
        iconSize: [44, 44],
        iconAnchor: [22, 22],
        popupAnchor: [0, -23]
    });
    // supply locations
    var supplyIcon = L.icon({
        iconUrl: 'assets/mapObjects/supply.png',
        iconSize: [44, 44],
        iconAnchor: [22, 22],
        popupAnchor: [0, -23]
    });

    // heavy military / APVs
    var apvIcon = L.icon({
        iconUrl: 'assets/mapObjects/apv.png',
        iconSize: [44, 44],
        iconAnchor: [22, 22],
        popupAnchor: [0, -23]
    });
    // generic crowd gatherings
    var crowdIcon = L.icon({
        iconUrl: 'assets/mapObjects/crowd.png',
        iconSize: [44, 44],
        iconAnchor: [22, 22],
        popupAnchor: [0, -23]
    });
    // live streaming
    var liveIcon = L.icon({
        iconUrl: 'assets/mapObjects/live.png',
        iconSize: [44, 44],
        iconAnchor: [22, 22],
        popupAnchor: [0, -23]
    });



    var defaultLocation = [25.044045,121.519902];
    var defaultPopup = L.popup()
        .setLatLng(defaultLocation)
        .setContent('<p><b>立法院</b><br />我方優勢</p>');




    // draw default object
    var drawDefaultObject = function(){
        var pathStyle = {
            stroke: true,
            color: '#77a3e0',
            weight: 4,
            opacity: 0.9,
            fill: true,
            fillColor: '#5f82b3',
            fillOpacity: 0.75,
            clickable: true // bind event to marker
        };
        var m = L.marker(defaultLocation, {icon: govIcon}).addTo(map);
        m.bindPopup(defaultPopup);
        var c = L.circle(defaultLocation, 108, pathStyle).addTo(map);
        c.on("click", function(event){
            // open popup on clicking
            m.openPopup();
            map.panTo(m._latlng,{easeLinearity: 0.1});
        });
        m.on("click", function(event){
            m.openPopup();
            map.panTo(m._latlng,{easeLinearity: 0.1});
        });

        markerArray.push(m);
        circleArray.push(c);
    };

        // draw individual object
    var drawWorldObject = function(obj){
            switch (obj.type) {

            }
            // var m = L.marker([obj.lat, obj.lng], {icon: govIcon}).addTo(map);
            var m = L.marker([25.044045,121.519902], {icon: govIcon}).addTo(map);

            // calculate radius based on area
            // 15 squaremeter per person for display

            var radius = Math.sqrt((15 * obj.population));
            var pathStyle = {}
            // determine drawing parameters
            switch (obj.status) {
                case 'friendly':
                    pathStyle = {
                        stroke: true,
                        color: '#77a3e0',
                        weight: 4,
                        opacity: 0.6,
                        fill: true,
                        fillColor: '#5f82b3',
                        fillOpacity: 0.3,
                        clickable: true // bind event to marker
                    };
                    break;
                case 'hostile':
                    pathStyle = {
                        stroke: true,
                        color: '#D23950',
                        weight: 4,
                        opacity: 0.6,
                        fill: true,
                        fillColor: '#932738',
                        fillOpacity: 0.3,
                        clickable: true // bind event to marker
                    };
                    break;
                case 'unknown':
                    pathStyle = {
                        stroke: true,
                        color: '#D2B439',
                        weight: 4,
                        opacity: 0.6,
                        fill: true,
                        fillColor: '#a8902d',
                        fillOpacity: 0.3,
                        clickable: true // bind event to marker
                    };
                    break;
            }

            var c = L.circle([obj.lat, obj.lng], radius, pathStyle).addTo(map);
            c.on("click", function(event){
                // open popup on clicking
                m.openPopup();
            });

            markerArray.push(m);
            circleArray.push(c);


        },
        // update existing world object
        updateWorldObject = function(obj, attr){

        }
        // remove individual object from map
        removeWorldObject = function(obj){
            //
        },
        // compare incoming world object with cache
        diffWorldObject = function(obj1, obj2){

        },
        // geometric functions
        // draw areas of occupation
        drawArea = function(obj){

        },
        removeArea = function(obj){

        },
        updateArea = function(obj){

        }
