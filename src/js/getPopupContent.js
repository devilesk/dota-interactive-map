var capitalize = require('./util/capitalize');

var unitNames = {
    npc_dota_roshan_spawner: "Roshan",
    dota_item_rune_spawner_powerup: "Rune",
    dota_item_rune_spawner_bounty: "Bounty Rune",
    ent_dota_tree: "Tree",
    npc_dota_healer: "Shrine",
    ent_dota_fountain: "Fountain",
    npc_dota_fort: "Ancient",
    ent_dota_shop: "Shop",
    npc_dota_tower: "Tower",
    npc_dota_barracks: "Barracks",
    npc_dota_filler: "Building",
    trigger_multiple: "Neutral Camp Spawn Box",
    npc_dota_neutral_spawner: "Neutral Camp",
    observer: "Observer Ward",
    sentry: "Sentry Ward"
};
    
function getUnitName(unitType, unitSubType) {
    return (unitSubType ? capitalize(unitSubType.replace('tower', 'Tier ').replace('range', 'Ranged')) + ' ' : '') + unitNames[unitType];
}
    
var pullTypes = ['Normal', 'Fast', 'Slow'];
var neutralTypes = ['Easy', 'Medium', 'Hard', 'Ancient'];
function getPopupContent(data, feature) {
    var dotaProps = feature.get('dotaProps');
    var unitClass = dotaProps.subType ? dotaProps.id + '_' + dotaProps.subType : dotaProps.id;
    var stats = data.data.stats[unitClass];
    var htmlContent = '<div class="info"><span class="info-header">' + getUnitName(dotaProps.id, dotaProps.subType) + '</span><span class="info-body">';
    if (dotaProps.pullType != null) {
        htmlContent += '<br><span class="info-line">Pull Type: ' + pullTypes[dotaProps.pullType] + '</span>';
    }
    if (dotaProps.neutralType != null) {
        htmlContent += '<br><span class="info-line">Difficulty: ' + neutralTypes[dotaProps.neutralType] + '</span>';
    }
    if (stats.hasOwnProperty('damageMin') && stats.hasOwnProperty('damageMax')) {
        htmlContent += '<br><span class="info-line">Damage: ' + stats.damageMin + "&ndash;" + stats.damageMax + '</span>';
    }
    if (stats.hasOwnProperty('bat')) {
        htmlContent += '<br><span class="info-line">BAT: ' + stats.bat + '</span>';
    }
    if (stats.hasOwnProperty('attackRange')) {
        htmlContent += '<br><span class="info-line">Attack Range: ' + stats.attackRange + '</span>';
    }
    if (stats.hasOwnProperty('health')) {
        htmlContent += '<br><span class="info-line">Health: ' + stats.health + '</span>';
    }
    if (stats.hasOwnProperty('armor')) {
        htmlContent += '<br><span class="info-line">Armor: ' + stats.armor + '</span>';
    }
    if (stats.hasOwnProperty('dayVision') && stats.hasOwnProperty('nightVision')) {
        htmlContent += '<br><span class="info-line">Vision: ' + stats.dayVision + "/" + stats.nightVision + '</span>';
    }
    htmlContent += '</span></div>';
    return htmlContent;
}

module.exports = getPopupContent;