import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import RegularShape from 'ol/style/RegularShape';
import Icon from 'ol/style/Icon';
import Circle from 'ol/style/Circle';
import getFeatureCenter from './util/getFeatureCenter';

const defaultStyle = new Style({
    fill: new Fill({ color: 'rgba(255,255,255,0.4)' }),
    stroke: new Stroke({
        color: '#3399CC',
        width: 1.25,
    }),
});

const styles = {
    creepSpawn: new Style({
        image: new RegularShape({
            points: 6,
            radius: 8,
            fill: new Fill({ color: 'rgba(0, 0, 255, 0.3)' }),
            stroke: new Stroke({
                color: 'rgba(0, 0, 255, 0.7)',
                width: 2,
            }),
        }),
    }),
    neutralCamp: [
        new Style({
            image: new RegularShape({
                points: 3,
                radius: 8,
                fill: new Fill({ color: 'rgba(0, 255, 0, 0.3)' }),
                stroke: new Stroke({
                    color: 'rgba(0, 255, 0, 0.7)',
                    width: 2,
                }),
            }),
        }),
        new Style({
            image: new RegularShape({
                points: 3,
                radius: 9,
                fill: new Fill({ color: 'rgba(255, 255, 0, 0.3)' }),
                stroke: new Stroke({
                    color: 'rgba(255, 255, 0, 0.7)',
                    width: 2,
                }),
            }),
        }),
        new Style({
            image: new RegularShape({
                points: 3,
                radius: 10,
                fill: new Fill({ color: 'rgba(255, 150, 0, 0.3)' }),
                stroke: new Stroke({
                    color: 'rgba(255, 150, 0, 0.7)',
                    width: 2,
                }),
            }),
        }),
        new Style({
            image: new RegularShape({
                points: 3,
                radius: 11,
                fill: new Fill({ color: 'rgba(255, 0, 0, 0.3)' }),
                stroke: new Stroke({
                    color: 'rgba(255, 0, 0, 0.7)',
                    width: 2,
                }),
            }),
        }),
    ],
    dire: new Style({
        fill: new Fill({ color: 'rgba(255, 51, 51, 0.2)' }),
        stroke: new Stroke({
            color: '#FF3333',
            width: 2,
        }),
    }),
    radiant: new Style({
        fill: new Fill({ color: 'rgba(51, 255, 51, 0.2)' }),
        stroke: new Stroke({
            color: '#33FF33',
            width: 2,
        }),
    }),
    direCreep: new Style({
        fill: new Fill({ color: 'rgba(255, 51, 51, 0.2)' }),
        stroke: new Stroke({
            color: '#FF3333',
            width: 10,
        }),
    }),
    radiantCreep: new Style({
        fill: new Fill({ color: 'rgba(51, 255, 51, 0.2)' }),
        stroke: new Stroke({
            color: '#33FF33',
            width: 10,
        }),
    }),
    highlight: new Style({
        fill: new Fill({ color: 'rgba(255, 255, 0, 0.2)' }),
        stroke: new Stroke({
            color: '#ffff00',
            width: 2,
        }),
    }),
    select: new Style({
        fill: new Fill({ color: 'rgba(0, 255, 0, 0.2)' }),
        stroke: new Stroke({
            color: '#00ff00',
            width: 2,
        }),
    }),
    cursor: new Style({
        fill: new Fill({ color: 'rgba(255, 255, 255, 0.2)' }),
        stroke: new Stroke({
            color: 'rgba(255, 255, 255, 1)',
            width: 1,
        }),
    }),
    visionSimulation: new Style({
        fill: new Fill({ color: 'rgba(255, 255, 0, 0.2)' }),
        stroke: new Stroke({
            color: 'rgba(255, 255, 0, 1)',
            width: 1,
        }),
    }),
    dayVision: new Style({
        fill: new Fill({ color: 'rgba(238, 153, 0, 0.1)' }),
        stroke: new Stroke({
            color: 'rgba(238, 153, 0, 0.5)',
            width: 2,
        }),
    }),
    nightVision: new Style({
        fill: new Fill({ color: 'rgba(0, 127, 255, 0.1)' }),
        stroke: new Stroke({
            color: 'rgba(0, 0, 255, 0.5)',
            width: 2,
        }),
    }),
    trueSight: new Style({
        fill: new Fill({ color: 'rgba(0, 127, 255, 0.1)' }),
        stroke: new Stroke({
            color: 'rgba(0, 127, 255, 0.5)',
            width: 2,
        }),
    }),
    attackRange: new Style({
        fill: new Fill({ color: 'rgba(255, 0, 0, 0.1)' }),
        stroke: new Stroke({
            color: 'rgba(255, 0, 0, 0.5)',
            width: 2,
        }),
    }),
    ent_dota_fountain: [
        defaultStyle,
        new Style({
            image: new Icon({
                src: 'img/svgs/water-15.svg',
                anchor: [0.5, 0.5],
                imgSize: [21, 21],
            }),
            geometry: getFeatureCenter,
        }),
    ],
    npc_dota_barracks: [
        defaultStyle,
        new Style({
            image: new Icon({
                src: 'img/svgs/stadium-15.svg',
                anchor: [0.5, 0.5],
                imgSize: [21, 21],
            }),
            geometry: getFeatureCenter,
        }),
    ],
    npc_dota_filler: [
        defaultStyle,
        new Style({
            image: new Icon({
                src: 'img/svgs/landmark-15.svg',
                anchor: [0.5, 0.5],
                imgSize: [21, 21],
            }),
            geometry: getFeatureCenter,
        }),
    ],
    npc_dota_tower: [
        defaultStyle,
        new Style({
            image: new Icon({
                src: 'img/svgs/castle-15.svg',
                anchor: [0.5, 0.5],
                imgSize: [21, 21],
            }),
            geometry: getFeatureCenter,
        }),
    ],
    ent_dota_shop: [
        defaultStyle,
        new Style({
            image: new Icon({
                src: 'img/svgs/shop-15.svg',
                anchor: [0.5, 0.5],
                imgSize: [21, 21],
            }),
            geometry: getFeatureCenter,
        }),
    ],
    npc_dota_fort: [
        defaultStyle,
        new Style({
            image: new Icon({
                src: 'img/svgs/town-hall-15.svg',
                anchor: [0.5, 0.5],
                imgSize: [21, 21],
            }),
            geometry: getFeatureCenter,
        }),
    ],
    npc_dota_healer: [
        defaultStyle,
        new Style({
            image: new Icon({
                src: 'img/svgs/place-of-worship-15.svg',
                anchor: [0.5, 0.5],
                imgSize: [21, 21],
            }),
            geometry: getFeatureCenter,
        }),
    ],
    npc_dota_watch_tower: [
        defaultStyle,
        new Style({
            image: new Icon({
                src: 'img/svgs/lighthouse-15.svg',
                anchor: [0.5, 0.5],
                imgSize: [21, 21],
            }),
            geometry: getFeatureCenter,
        }),
    ],
    measure: new Style({
        fill: new Fill({ color: 'rgba(255, 255, 255, 0.3)' }),
        stroke: new Stroke({
            color: 'rgba(255,165,0, 0.7)',
            lineDash: [10, 10],
            width: 3,
        }),
        image: new Circle({
            radius: 5,
            stroke: new Stroke({
                color: 'rgba(255,165,0, 0.7)',
                width: 2,
            }),
            fill: new Fill({ color: 'rgba(255,165,0, 0.3)' }),
        }),
    }),
    observer: {
        normal: new Style({
            image: new Icon({
                src: 'img/ward_observer.png',
                anchor: [0.5, 1],
            }),
        }),
        highlight: new Style({
            image: new Icon({
                src: 'img/ward_observer.png',
                anchor: [0.5, 1],
                color: '#0000ff',
            }),
        }),
        remove: new Style({
            image: new Icon({
                src: 'img/ward_observer.png',
                anchor: [0.5, 1],
                color: '#ff0000',
            }),
        }),
    },
    sentry: {
        normal: new Style({
            image: new Icon({
                src: 'img/ward_sentry.png',
                anchor: [0.5, 1],
            }),
        }),
        highlight: new Style({
            image: new Icon({
                src: 'img/ward_sentry.png',
                anchor: [0.5, 1],
                color: '#0000ff',
            }),
        }),
        remove: new Style({
            image: new Icon({
                src: 'img/ward_sentry.png',
                anchor: [0.5, 1],
                color: '#ff0000',
            }),
        }),
    },
    tree: {
        alive: new Style({
            fill: new Fill({ color: [0, 255, 0, 0.3] }),
            stroke: new Stroke({ color: [0, 255, 0, 0.8] }),
        }),
        dead: new Style({
            fill: new Fill({ color: [51, 25, 0, 0.7] }),
            stroke: new Stroke({ color: [255, 128, 0, 0.8] }),
        }),
    },
    bountyRune: new Style({
        image: new Icon({
            src: 'img/bountyrune.png',
            anchor: [0.5, 0.5],
        }),
    }),
    rune: new Style({
        image: new Icon({
            src: 'img/doubledamage.png',
            anchor: [0.5, 0.5],
        }),
    }),
    roshan: new Style({
        image: new Icon({
            src: 'img/roshan.png',
            anchor: [0.5, 0.5],
        }),
    }),
};

const elevationStyles = {};
/*const elevationColors = {
    0: '#250F03AA',
    20: '#392807AA',
    40: '#4D4A09AA',
    60: '#4F6311AA',
    80: '#45771CAA',
    100: '#368B27AA',
    120: '#36A246AA',
    140: '#46B678AA',
    160: '#56C3A8AA',
    180: '#6BC9CEAA',
    200: '#86BBD8AA',
    220: '#9FB6E0AA',
    240: '#B6B9EBAA',
    255: '#DFD7F8AA',
}
const elevationColors = {
    0: [30, 92, 179],
    20: [23, 111, 193],
    40: [11, 142, 216],
    //20: [4, 161, 230],
    //60: [25, 181, 241],
    60: [51, 188, 207],
    //60: [102, 204, 206],
    //100: [153, 219, 184],
    80: [192, 229, 136],
    100: [204, 230, 75],
    120: [243, 240, 29],
    140: [254, 222, 39],
    160: [252, 199, 7],
    180: [248, 157, 14],
    200: [245, 114, 21],
    220: [241, 71, 28],
    240: [219, 30, 38],
    255: [164, 38, 44],
}
const elevationColors = {
    0: [0, 132, 53],
    20: [24, 166, 28],
    40: [48, 200, 3],
    60: [131, 219, 47],
    80: [222, 236, 100],
    100: [244, 231, 105],
    120: [244, 219, 95],
    140: [244, 207, 84],
    160: [244, 195, 74],
    180: [233, 178, 66],
    200: [211, 157, 60],
    220: [190, 136, 54],
    240: [168, 115, 47],
    255: [160, 111, 57],
    //200: [184, 147, 107],
    //220: [208, 184, 157],
    //240: [232, 220, 207],
    //255: [255, 255, 255],
}*/
const elevationColors = {
    0: [0, 0, 0],
    20: [5, 20, 117],
    40: [15, 53, 120],
    //40: [26, 84, 123],
    60: [64, 148, 87],
    //60: [77, 156, 72],
    //80: [75, 156, 72],
    //80: [124, 168, 83],
    //100: [165, 179, 90],
    80: [165, 179, 90],
    //80: [190, 167, 100],
    //140: [196, 164, 107],
    //100: [204, 169, 127],
    //100: [212, 176, 144],
    100: [222, 186, 167],
    //120: [239, 214, 209],
    //140: [239, 214, 209],
    //160: [239, 214, 209],
    //180: [239, 214, 209],
    120: [239, 214, 209],
    140: [239, 214, 209],
    160: [239, 214, 209],
    180: [239, 214, 209],
    200: [239, 214, 209],
    220: [239, 214, 209],
    240: [239, 214, 209],
    255: [239, 214, 209],
    //120: [247, 234, 233],
    //140: [247, 234, 233],
    //160: [247, 234, 233],
    //180: [247, 234, 233],
    //200: [247, 234, 233],
    //220: [247, 234, 233],
    //240: [247, 234, 233],
    //255: [247, 234, 233],
    //255: [255, 255, 255],
    //200: [],
    //220: [],
    //240: [],
    //255: [],
}
styles.elevation = (feature, resolution) => {
    const elevation = parseInt(feature.getProperties().elevation);
    console.log('elevation', elevation);
    elevationStyles[elevation] = elevationStyles[elevation] || new Style({
        fill: new Fill({ color: elevationColors[elevation].concat([0.4]) }),
        stroke: new Stroke({ color: elevationColors[elevation].concat([0.8]) }),
    });
    return elevationStyles[elevation];
};

styles.teamColor = (feature, resolution) => {
    if (feature.getId().indexOf('_bad_') == -1) {
        return styles.radiant;
    }

    return styles.dire;
};

styles.creepColor = (feature, resolution) => {
    if (feature.getId().indexOf('_bad_') == -1) {
        return styles.radiantCreep;
    }

    return styles.direCreep;
};

export default styles;
