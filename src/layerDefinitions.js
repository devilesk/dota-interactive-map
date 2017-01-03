var ol = require('openlayers');
var styles = require('./styleDefinitions');

var layerDefinitions = [
    {
        id: 'ent_fow_blocker_node',
        name: 'Vision Blocker',
        filename: 'ent_fow_blocker_node2.json',
        type: 'GeoJSON',
        group: 'overlay',
        style: new ol.style.Style({
            fill: new ol.style.Fill({color: [0, 0, 255, 0.3]}),
            stroke: new ol.style.Stroke({color: [0, 0, 255, 0.8]})
        })
    },
    {
        id: 'no_wards',
        name: 'Invalid Wards',
        filename: 'no_wards2.json',
        type: 'GeoJSON',
        group: 'overlay',
        style: new ol.style.Style({
            fill: new ol.style.Fill({color: [255, 0, 0, 0.3]}),
            stroke: new ol.style.Stroke({color: [255, 0, 0, 0.8]})
        })
    },
    {
        id: 'npc_dota_neutral_spawner',
        name: 'Neutral Camps',
        icon: 'img/svgs/jungle_0.svg',
        group: 'object'
    },
    {
        id: 'ent_dota_tree',
        name: 'Trees',
        icon: 'img/svgs/park-15.svg',
        group: 'object',
        style:  function (feature, resolution) {
            if (feature.get('isCut')) {
                return styles.tree.dead;
            }
            else {
                return styles.tree.alive;
            }
        }
    },
    {
        id: 'npc_dota_roshan_spawner',
        name: 'Roshan',
        icon: 'img/roshan.png',
        group: 'object'
    },
    {
        id: 'dota_item_rune_spawner_powerup',
        name: 'Runes',
        icon: 'img/doubledamage.png',
        group: 'object'
    },
    {
        id: 'dota_item_rune_spawner_bounty',
        name: 'Bounty Runes',
        icon: 'img/bountyrune.png',
        group: 'object'
    },
    {
        id: 'ent_dota_fountain',
        name: 'Fountain',
        icon: 'img/svgs/water-15.svg',
        group: 'structure'
    },
    {
        id: 'npc_dota_barracks',
        name: 'Barracks',
        icon: 'img/svgs/stadium-15.svg',
        group: 'structure'
    },
    {
        id: 'npc_dota_filler',
        name: 'Buildings',
        icon: 'img/svgs/landmark-15.svg',
        group: 'structure'
    },
    {
        id: 'npc_dota_tower',
        name: 'Towers',
        icon: 'img/svgs/castle-15.svg',
        group: 'structure'
    },
    {
        id: 'ent_dota_shop',
        name: 'Shops',
        icon: 'img/svgs/shop-15.svg',
        group: 'structure'
    },
    {
        id: 'npc_dota_fort',
        name: 'Ancients',
        icon: 'img/svgs/town-hall-15.svg',
        group: 'structure'
    },
    {
        id: 'npc_dota_healer',
        name: 'Shrines',
        icon: 'img/svgs/place-of-worship-15.svg',
        group: 'structure'
    }
];

module.exports = layerDefinitions;