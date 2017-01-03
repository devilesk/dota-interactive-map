var ol = require('openlayers');

var styles = {
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