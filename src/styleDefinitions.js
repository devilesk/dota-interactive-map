var ol = require('openlayers');

var styles = {
    highlight: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 0, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ffff00',
            width: 2
        })
    }),
    select: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(0, 255, 0, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#00ff00',
            width: 2
        })
    }),
    cursor: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(255, 255, 255, 1)',
            width: 1
        })
    }),
    visionSimulation: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 0, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(255, 255, 0, 1)',
            width: 1
        })
    }),
    dayVision: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(238, 153, 0, 0.1)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(238, 153, 0, 0.5)',
            width: 2
        })
    }),
    nightVision: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(0, 127, 255, 0.1)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 255, 0.5)',
            width: 2
        })
    }),
    trueSight: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(0, 127, 255, 0.1)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(0, 127, 255, 0.5)',
            width: 2
        })
    }),
    attackRange: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 0, 0, 0.1)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(255, 0, 0, 0.5)',
            width: 2
        })
    }),
    measure: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.3)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(255,165,0, 0.7)',
            lineDash: [10, 10],
            width: 3
        }),
        image: new ol.style.Circle({
            radius: 5,
            stroke: new ol.style.Stroke({
                color: 'rgba(255,165,0, 0.7)',
                width: 2
            }),
            fill: new ol.style.Fill({
                color: 'rgba(255,165,0, 0.3)'
            })
        })
    }),
    observer: {
        normal: new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/ward_observer.png',
                anchor: [0.5, 1]
            })
        }),
        highlight: new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/ward_observer.png',
                anchor: [0.5, 1],
                color: '#0000ff'
            })
        }),
        remove: new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/ward_observer.png',
                anchor: [0.5, 1],
                color: '#ff0000'
            })
        })
    },
    sentry: {
        normal: new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/ward_sentry.png',
                anchor: [0.5, 1]
            })
        }),
        highlight: new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/ward_sentry.png',
                anchor: [0.5, 1],
                color: '#0000ff'
            })
        }),
        remove: new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/ward_sentry.png',
                anchor: [0.5, 1],
                color: '#ff0000'
            })
        })
    },
    tree: {
        alive: new ol.style.Style({
            fill: new ol.style.Fill({color: [0, 255, 0, 0.3]}),
            stroke: new ol.style.Stroke({color: [0, 255, 0, 0.8]})
        }),
        dead: new ol.style.Style({
            fill: new ol.style.Fill({color: [51, 25, 0, 0.7]}),
            stroke: new ol.style.Stroke({color: [255, 128, 0, 0.8]})
        })
    }
}

module.exports = styles;