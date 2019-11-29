import capitalize from './util/capitalize';

const unitNames = {
    npc_dota_roshan_spawner: 'Roshan',
    dota_item_rune_spawner_powerup: 'Rune',
    dota_item_rune_spawner_bounty: 'Bounty Rune',
    ent_dota_tree: 'Tree',
    npc_dota_healer: 'Shrine',
    ent_dota_fountain: 'Fountain',
    npc_dota_fort: 'Ancient',
    ent_dota_shop: 'Shop',
    npc_dota_tower: 'Tower',
    npc_dota_barracks: 'Barracks',
    npc_dota_filler: 'Building',
    npc_dota_watch_tower: 'Outpost',
    trigger_multiple: 'Neutral Camp Spawn Box',
    npc_dota_neutral_spawner: 'Neutral Camp',
    observer: 'Observer Ward',
    sentry: 'Sentry Ward',
};

const getUnitName = (unitType, unitSubType) => (unitSubType
    ? `${capitalize(unitSubType.replace('tower', 'Tier ').replace('range', 'Ranged'))} `
    : '') + unitNames[unitType];

const pullTypes = ['Normal', 'Fast', 'Slow'];
const neutralTypes = ['Easy', 'Medium', 'Hard', 'Ancient'];

const getPopupContent = (stats, feature) => {
    const dotaProps = feature.get('dotaProps');
    const unitClass = dotaProps.subType ? `${dotaProps.id}_${dotaProps.subType}` : dotaProps.id;
    const unitStats = stats[unitClass];
    let htmlContent = `<div class="info"><span class="info-header">${getUnitName(dotaProps.id, dotaProps.subType)}</span><span class="info-body">`;
    if (dotaProps.pullType != null) {
        htmlContent += `<br><span class="info-line">Pull Type: ${pullTypes[dotaProps.pullType]}</span>`;
    }
    if (dotaProps.neutralType != null) {
        htmlContent += `<br><span class="info-line">Difficulty: ${neutralTypes[dotaProps.neutralType]}</span>`;
    }
    if (stats && unitStats) {
        if (unitStats.hasOwnProperty('damageMin') && unitStats.hasOwnProperty('damageMax')) {
            htmlContent += `<br><span class="info-line">Damage: ${unitStats.damageMin}&ndash;${unitStats.damageMax}</span>`;
        }
        if (unitStats.hasOwnProperty('bat')) {
            htmlContent += `<br><span class="info-line">BAT: ${unitStats.bat}</span>`;
        }
        if (unitStats.hasOwnProperty('attackRange')) {
            htmlContent += `<br><span class="info-line">Attack Range: ${unitStats.attackRange}</span>`;
        }
        if (unitStats.hasOwnProperty('health')) {
            htmlContent += `<br><span class="info-line">Health: ${unitStats.health}</span>`;
        }
        if (unitStats.hasOwnProperty('armor')) {
            htmlContent += `<br><span class="info-line">Armor: ${unitStats.armor}</span>`;
        }
        if (unitStats.hasOwnProperty('dayVision') && unitStats.hasOwnProperty('nightVision')) {
            htmlContent += `<br><span class="info-line">Vision: ${unitStats.dayVision}/${unitStats.nightVision}</span>`;
        }
    }
    htmlContent += '</span></div>';
    return htmlContent;
};

export default getPopupContent;
