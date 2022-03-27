/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

var map;

window.onload = function (e){
    mapboxgl.accessToken = 'pk.eyJ1IjoiZG9ndWthbmRvZ3UiLCJhIjoiY2t4ZDF2amRwMDlpdDJzbjRva3NpM3Q0aSJ9.Xx1batj2ConRU7qOlFWDHw';
map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: [35, 40], // starting position [lng, lat]
zoom: 5 // starting zoom
});

//addPointLayerToMap();
//addLineLayerToMap();
//addPolygonLayerToMap();

addPopulationPolygon3DLayerToMap();
};

function getGeojson(service, _callback) {
    var url = "/geojsonserver/geojson/" + service;

    fetch(url).then(res => res.json())
            .then((res) => {
                {
                    _callback(res);
                    return;
                }
            }
            );
};

function addPointLayerToMap() {

    //Example from getPolygonPoints getPointPolygons?city=Ankara
    getGeojson("getPoints", (_result) => {

        map.addSource("pointSourceId", {
            'type': 'geojson',
            'data': _result
        });

        var pointLayer =
                {
                    'id': "pointLayerId",
                    'type': 'circle',
                    'source': "pointSourceId",
                    'paint': {
                        'circle-radius': 3,
                        'circle-color': '#FF0000'
                    },
                    'minZoom': 5,
                    'maxZoom': 15

                };

        this.map.addLayer(pointLayer);

        map.on('click', 'pointLayerId', function (e) {

            const popup = new mapboxgl.Popup({closeButton: false})
                    .setLngLat(e.lngLat)
                    .setHTML(e.features[0].properties.tipi)
                    .addTo(map);
        });


    });
};


function addLineLayerToMap() {

    getGeojson("getLinestrings", (_result) => {

        map.addSource("lineSourceId", {
            'type': 'geojson',
            'data': _result
        });

        var lineLayer =
                {
                    'id': "lineLayerId",
                    'type': 'line',
                    'source': "lineSourceId",
                    'paint': {
                        'line-width': 5,
                        'line-color': '#FF0000'
                    },
                    'minZoom': 5,
                    'maxZoom': 15

                };

        this.map.addLayer(lineLayer);


        map.on('click', 'lineLayerId', function (e) {
            popup = new mapboxgl.Popup({closeButton: false})
                    .setLngLat(e.lngLat)
                    .setHTML(e.features[0].properties.adi)
                    .addTo(map);
        });

    });
};


function addPolygonLayerToMap() {

    getGeojson("getPolygons", (_result) => {

        map.addSource("polygonSourceId", {
            'type': 'geojson',
            'data': _result
        });

        var polygonLayer =
                {
                    'id': "polygonLayerId",
                    'type': 'fill',
                    'source': "polygonSourceId",
                    'paint': {
                        'fill-opacity': 0.3,
                        'fill-outline-color': '#000000',
                        'fill-color': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],
                            '#00FF00',
                            '#0000FF'
                        ]


                    },
                    'minZoom': 5,
                    'maxZoom': 15

                };

        this.map.addLayer(polygonLayer);

        map.on('click', 'polygonLayerId', function (e) {
            var featureId = e.features[0].id;

            if (e.features[0].state.hover) {
                map.setFeatureState(
                        {source: 'polygonSourceId', id: featureId},
                        {hover: false}
                );
            } else {
                map.setFeatureState(
                        {source: 'polygonSourceId', id: featureId},
                        {hover: true}
                );
            }
        });
    });
};


function addPopulationPolygon3DLayerToMap() {

    getGeojson("getPolygons", (_result) => {

        map.addSource("populationPolygon3DSourceId", {
            'type': 'geojson',
            'data': _result
        });

        var polygonLayer =
                {
                    'id': "populationPolygon3DLayerId",
                    'type': 'fill-extrusion',
                    'source': "populationPolygon3DSourceId",
                    'paint': {
                        'fill-extrusion-opacity': 0.5,
                        'fill-extrusion-color':
                                [
                                    'step',
                                    ['get', 'nufus'],
                                    '#00FF00',
                                    500000,
                                    '#FFFF00',
                                    1000000,
                                    '#FFA500',
                                    3000000,
                                    '#FF0000',
                                    5000000,
                                    '#8B0000'
                                ],
                        'fill-extrusion-height':
                                [
                                    'step',
                                    ['get', 'nufus'],
                                    5000,
                                    500000,
                                    10000,
                                    1000000,
                                    20000,
                                    3000000,
                                    40000,
                                    5000000,
                                    80000
                                ],

                    },
                    'minZoom': 5,
                    'maxZoom': 15

                };

        this.map.addLayer(polygonLayer);

        map.on('click', 'populationPolygon3DLayerId', function (e) {
            new mapboxgl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(e.features[0].properties.il + " : " + e.features[0].properties.nufus)
                    .addTo(map);
        });
    });
};