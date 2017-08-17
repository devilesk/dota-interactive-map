import Style from 'ol/style/style';
import Fill from 'ol/style/fill';
import Stroke from 'ol/style/stroke';
import RegularShape from 'ol/style/regularshape';
import Icon from 'ol/style/icon';
import Circle from 'ol/style/circle';
import getFeatureCenter from './util/getFeatureCenter';

var defaultStyle = new Style({
    fill: new Fill({
        color: 'rgba(255,255,255,0.4)'
    }),
    stroke: new Stroke({
        color: '#3399CC',
        width: 1.25
    })
});

var styles = {
    creepSpawn: new Style({
        image: new RegularShape({
            points: 6,
            radius: 8,
            fill: new Fill({
                color: 'rgba(0, 0, 255, 0.3)'
            }),
            stroke: new Stroke({
                color: 'rgba(0, 0, 255, 0.7)',
                width: 2
            })
        })
    }),
    neutralCamp: [
        new Style({
            image: new RegularShape({
                points: 3,
                radius: 8,
                fill: new Fill({
                    color: 'rgba(0, 255, 0, 0.3)'
                }),
                stroke: new Stroke({
                    color: 'rgba(0, 255, 0, 0.7)',
                    width: 2
                })
            })
        }),
        new Style({
            image: new RegularShape({
                points: 3,
                radius: 9,
                fill: new Fill({
                    color: 'rgba(255, 255, 0, 0.3)'
                }),
                stroke: new Stroke({
                    color: 'rgba(255, 255, 0, 0.7)',
                    width: 2
                })
            })
        }),
        new Style({
            image: new RegularShape({
                points: 3,
                radius: 10,
                fill: new Fill({
                    color: 'rgba(255, 150, 0, 0.3)'
                }),
                stroke: new Stroke({
                    color: 'rgba(255, 150, 0, 0.7)',
                    width: 2
                })
            })
        }),
        new Style({
            image: new RegularShape({
                points: 3,
                radius: 11,
                fill: new Fill({
                    color: 'rgba(255, 0, 0, 0.3)'
                }),
                stroke: new Stroke({
                    color: 'rgba(255, 0, 0, 0.7)',
                    width: 2
                })
            })
        })
    ],
    dire: new Style({
        fill: new Fill({
            color: 'rgba(255, 51, 51, 0.2)'
        }),
        stroke: new Stroke({
            color: '#FF3333',
            width: 2
        })
    }),
    radiant: new Style({
        fill: new Fill({
            color: 'rgba(51, 255, 51, 0.2)'
        }),
        stroke: new Stroke({
            color: '#33FF33',
            width: 2
        })
    }),
    direCreep: new Style({
        fill: new Fill({
            color: 'rgba(255, 51, 51, 0.2)'
        }),
        stroke: new Stroke({
            color: '#FF3333',
            width: 10
        })
    }),
    radiantCreep: new Style({
        fill: new Fill({
            color: 'rgba(51, 255, 51, 0.2)'
        }),
        stroke: new Stroke({
            color: '#33FF33',
            width: 10
        })
    }),
    highlight: new Style({
        fill: new Fill({
            color: 'rgba(255, 255, 0, 0.2)'
        }),
        stroke: new Stroke({
            color: '#ffff00',
            width: 2
        })
    }),
    select: new Style({
        fill: new Fill({
            color: 'rgba(0, 255, 0, 0.2)'
        }),
        stroke: new Stroke({
            color: '#00ff00',
            width: 2
        })
    }),
    cursor: new Style({
        fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
            color: 'rgba(255, 255, 255, 1)',
            width: 1
        })
    }),
    visionSimulation: new Style({
        fill: new Fill({
            color: 'rgba(255, 255, 0, 0.2)'
        }),
        stroke: new Stroke({
            color: 'rgba(255, 255, 0, 1)',
            width: 1
        })
    }),
    dayVision: new Style({
        fill: new Fill({
            color: 'rgba(238, 153, 0, 0.1)'
        }),
        stroke: new Stroke({
            color: 'rgba(238, 153, 0, 0.5)',
            width: 2
        })
    }),
    nightVision: new Style({
        fill: new Fill({
            color: 'rgba(0, 127, 255, 0.1)'
        }),
        stroke: new Stroke({
            color: 'rgba(0, 0, 255, 0.5)',
            width: 2
        })
    }),
    trueSight: new Style({
        fill: new Fill({
            color: 'rgba(0, 127, 255, 0.1)'
        }),
        stroke: new Stroke({
            color: 'rgba(0, 127, 255, 0.5)',
            width: 2
        })
    }),
    attackRange: new Style({
        fill: new Fill({
            color: 'rgba(255, 0, 0, 0.1)'
        }),
        stroke: new Stroke({
            color: 'rgba(255, 0, 0, 0.5)',
            width: 2
        })
    }),
    ent_dota_fountain: [
        defaultStyle,
        new Style({
            image: new Icon({
                src: 'img/svgs/water-15.svg',
                anchor: [0.5, 0.5],
                imgSize: [21, 21]
            }),
            geometry: getFeatureCenter
        })
    ],
    npc_dota_barracks: [
        defaultStyle,
        new Style({
            image: new Icon({
                src: 'img/svgs/stadium-15.svg',
                anchor: [0.5, 0.5],
                imgSize: [21, 21]
            }),
            geometry: getFeatureCenter
        })
    ],
    npc_dota_filler: [
        defaultStyle,
        new Style({
            image: new Icon({
                src: 'img/svgs/landmark-15.svg',
                anchor: [0.5, 0.5],
                imgSize: [21, 21]
            }),
            geometry: getFeatureCenter
        })
    ],
    npc_dota_tower: [
        defaultStyle,
        new Style({
            image: new Icon({
                src: 'img/svgs/castle-15.svg',
                anchor: [0.5, 0.5],
                imgSize: [21, 21]
            }),
            geometry: getFeatureCenter
        })
    ],
    ent_dota_shop: [
        defaultStyle,
        new Style({
            image: new Icon({
                src: 'img/svgs/shop-15.svg',
                anchor: [0.5, 0.5],
                imgSize: [21, 21]
            }),
            geometry: getFeatureCenter
        })
    ],
    npc_dota_fort: [
        defaultStyle,
        new Style({
            image: new Icon({
                src: 'img/svgs/town-hall-15.svg',
                anchor: [0.5, 0.5],
                imgSize: [21, 21]
            }),
            geometry: getFeatureCenter
        })
    ],
    npc_dota_healer: [
        defaultStyle,
        new Style({
            image: new Icon({
                src: 'img/svgs/place-of-worship-15.svg',
                anchor: [0.5, 0.5],
                imgSize: [21, 21]
            }),
            geometry: getFeatureCenter
        })
    ],
    measure: new Style({
        fill: new Fill({
            color: 'rgba(255, 255, 255, 0.3)'
        }),
        stroke: new Stroke({
            color: 'rgba(255,165,0, 0.7)',
            lineDash: [10, 10],
            width: 3
        }),
        image: new Circle({
            radius: 5,
            stroke: new Stroke({
                color: 'rgba(255,165,0, 0.7)',
                width: 2
            }),
            fill: new Fill({
                color: 'rgba(255,165,0, 0.3)'
            })
        })
    }),
    observer: {
        normal: new Style({
            image: new Icon({
                src: 'img/ward_observer.png',
                anchor: [0.5, 1]
            })
        }),
        highlight: new Style({
            image: new Icon({
                src: 'img/ward_observer.png',
                anchor: [0.5, 1],
                color: '#0000ff'
            })
        }),
        remove: new Style({
            image: new Icon({
                src: 'img/ward_observer.png',
                anchor: [0.5, 1],
                color: '#ff0000'
            })
        })
    },
    sentry: {
        normal: new Style({
            image: new Icon({
                src: 'img/ward_sentry.png',
                anchor: [0.5, 1]
            })
        }),
        highlight: new Style({
            image: new Icon({
                src: 'img/ward_sentry.png',
                anchor: [0.5, 1],
                color: '#0000ff'
            })
        }),
        remove: new Style({
            image: new Icon({
                src: 'img/ward_sentry.png',
                anchor: [0.5, 1],
                color: '#ff0000'
            })
        })
    },
    tree: {
        alive: new Style({
            fill: new Fill({color: [0, 255, 0, 0.3]}),
            stroke: new Stroke({color: [0, 255, 0, 0.8]})
        }),
        dead: new Style({
            fill: new Fill({color: [51, 25, 0, 0.7]}),
            stroke: new Stroke({color: [255, 128, 0, 0.8]})
        })
    },
    bountyRune: new Style({
        image: new Icon({
            src: 'img/bountyrune.png',
            anchor: [0.5, 0.5]
        })
    }),
    rune: new Style({
        image: new Icon({
            src: 'img/doubledamage.png',
            anchor: [0.5, 0.5]
        })
    }),
    roshan: new Style({
        image: new Icon({
            src: 'img/roshan.png',
            anchor: [0.5, 0.5]
        })
    }),
    pullRange: new Style({
        fill: new Fill({
            color: 'rgba(0, 153, 238, 0.1)'
        }),
        stroke: new Stroke({
            color: 'rgba(0, 153, 238, 0.5)',
            width: 2
        })
    }),
}

styles.teamColor = function (feature, resolution) {
    if (feature.getId().indexOf('_bad_') == -1) {
        return styles.radiant;
    }
    else {
        return styles.dire;
    }
}

styles.creepColor = function (feature, resolution) {
    if (feature.getId().indexOf('_bad_') == -1) {
        return styles.radiantCreep;
    }
    else {
        return styles.direCreep;
    }
}

export default styles;