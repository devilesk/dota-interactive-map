var ol = require('openlayers');

var defaultStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255,255,255,0.4)'
    }),
    stroke: new ol.style.Stroke({
        color: '#3399CC',
        width: 1.25
    })
});

var getFeatureCenter = function(feature) {
    var extent = feature.getGeometry().getExtent();
    var center = ol.extent.getCenter(extent);
    return new ol.geom.Point(center);
};

var styles = {
    neutralCamp: [
        new ol.style.Style({
            image: new ol.style.RegularShape({
                points: 3,
                radius: 8,
                fill: new ol.style.Fill({
                    color: 'rgba(0, 255, 0, 0.3)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 255, 0, 0.7)',
                    width: 2
                })
            })
        }),
        new ol.style.Style({
            image: new ol.style.RegularShape({
                points: 3,
                radius: 9,
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 0, 0.3)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(255, 255, 0, 0.7)',
                    width: 2
                })
            })
        }),
        new ol.style.Style({
            image: new ol.style.RegularShape({
                points: 3,
                radius: 10,
                fill: new ol.style.Fill({
                    color: 'rgba(255, 150, 0, 0.3)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(255, 150, 0, 0.7)',
                    width: 2
                })
            })
        }),
        new ol.style.Style({
            image: new ol.style.RegularShape({
                points: 3,
                radius: 11,
                fill: new ol.style.Fill({
                    color: 'rgba(255, 0, 0, 0.3)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(255, 0, 0, 0.7)',
                    width: 2
                })
            })
        })
    ],
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
    ent_dota_fountain: [
        defaultStyle,
        new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/svgs/water-15.svg',
                anchor: [0.5, 0.5]
            }),
            geometry: getFeatureCenter
        })
    ],
    npc_dota_barracks: [
        defaultStyle,
        new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/svgs/stadium-15.svg',
                anchor: [0.5, 0.5]
            }),
            geometry: getFeatureCenter
        })
    ],
    npc_dota_filler: [
        defaultStyle,
        new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/svgs/landmark-15.svg',
                anchor: [0.5, 0.5]
            }),
            geometry: getFeatureCenter
        })
    ],
    npc_dota_tower: [
        defaultStyle,
        new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/svgs/castle-15.svg',
                anchor: [0.5, 0.5]
            }),
            geometry: getFeatureCenter
        })
    ],
    ent_dota_shop: [
        defaultStyle,
        new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/svgs/shop-15.svg',
                anchor: [0.5, 0.5]
            }),
            geometry: getFeatureCenter
        })
    ],
    npc_dota_fort: [
        defaultStyle,
        new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/svgs/town-hall-15.svg',
                anchor: [0.5, 0.5]
            }),
            geometry: getFeatureCenter
        })
    ],
    npc_dota_healer: [
        defaultStyle,
        new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/svgs/place-of-worship-15.svg',
                anchor: [0.5, 0.5]
            }),
            geometry: getFeatureCenter
        })
    ],
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
    },
    bountyRune: new ol.style.Style({
        image: new ol.style.Icon({
            src: 'img/bountyrune.png',
            anchor: [0.5, 0.5]
        })
    }),
    rune: new ol.style.Style({
        image: new ol.style.Icon({
            src: 'img/doubledamage.png',
            anchor: [0.5, 0.5]
        })
    }),
    roshan: new ol.style.Style({
        image: new ol.style.Icon({
            src: 'img/roshan.png',
            anchor: [0.5, 0.5]
        })
    })
}

module.exports = styles;