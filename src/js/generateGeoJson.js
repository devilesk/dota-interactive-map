import VisionSimulation from 'dota-vision-simulation';
import worlddata from 'dota-vision-simulation/src/worlddata.json';
import union from '@turf/union';
import { worldToLatLon } from './conversion';
import fs from 'fs';

if (process.argv.length !== 3 && process.argv.length !== 4) throw new Error('Invalid number of arguments. Usage: <DOTA_PATCH_ID> (INDEX)');
const DOTA_PATCH_ID = process.argv[2];
const INDEX = parseInt(process.argv[3]) || -1;

console.log(`Generating no_wards.json, ent_fow_blocker_node.json, and elevation.json for patch: ${DOTA_PATCH_ID}`);

const vs = new VisionSimulation(worlddata);
vs.initialize(`assets/img/map_data_${DOTA_PATCH_ID}.png`, () => {
    let t1;
    
    if (INDEX === 0 || INDEX === -1) {
        t1 = Date.now();
        console.log('generating no_wards.json');
        const result = generateGeoJSON(vs, [vs.gridnav, vs.tools_no_wards]);
        fs.writeFileSync(`assets/data/${DOTA_PATCH_ID}/no_wards.json`, JSON.stringify(result), 'utf8');
        console.log('no_wards.json', `${Date.now() - t1}ms`);
    }
    else {
        console.log('skipping no_wards.json');
    }
    
    if (INDEX === 1 || INDEX === -1) {
        t1 = Date.now();
        console.log('ent_fow_blocker_node no_wards.json');
        const result = generateGeoJSON(vs, [vs.ent_fow_blocker_node]);
        fs.writeFileSync(`assets/data/${DOTA_PATCH_ID}/ent_fow_blocker_node.json`, JSON.stringify(result), 'utf8');
        console.log('ent_fow_blocker_node.json', `${Date.now() - t1}ms`);
    }
    else {
        console.log('skipping ent_fow_blocker_node.json');
    }
    
    if (INDEX === 2 || INDEX === -1) {
        const elevations = {};
        for (const [key, pt] of Object.entries(vs.elevationGrid)) {
            elevations[pt.z] = elevations[pt.z] || {};
            elevations[pt.z][key] = pt;
        }
        console.log('elevations', Object.keys(elevations));
        const resultCombined = {
            type: "FeatureCollection",
            features: [],
        };
        for (const [z, grid] of Object.entries(elevations)) {
            t1 = Date.now();
            console.log(`generating elevation_${z}.json`);
            const result = generateGeoJSON(vs, [grid], `assets/data/${DOTA_PATCH_ID}/elevation_${z}.json`);
            result.properties = { elevation: z };
            //fs.writeFileSync(`assets/data/${DOTA_PATCH_ID}/elevation_${z}.json`, JSON.stringify(result), 'utf8');
            resultCombined.features.push(result);
            console.log(`elevation_${z}.json`, `${Date.now() - t1}ms`);
        }
        fs.writeFileSync(`assets/data/${DOTA_PATCH_ID}/elevation.json`, JSON.stringify(resultCombined), 'utf8');
    }
    else {
        console.log('skipping elevation.json');
    }
});

const generateGeoJSON = (vs, grids) => {
    let result = null;
    grids.forEach((data, index) => {
        const total = Object.keys(data).length;
        let count = 0;
        for (const i in data) {
            const pt = vs.key2pt(i);
            const worldXY = vs.GridXYtoWorldXY(pt.x, pt.y);
            const poly = {
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [[
                        [worldXY.x - 32, worldXY.y - 32],
                        [worldXY.x - 32, worldXY.y + 32],
                        [worldXY.x + 32, worldXY.y + 32],
                        [worldXY.x + 32, worldXY.y - 32],
                        [worldXY.x - 32, worldXY.y - 32],
                    ]],
                },
            };
            if (result == null) {
                result = poly;
            }
            else {
                result = union(result, poly);
            }
            if (count % 200 === 0) {
                console.log('grids', index, '/', grids.length, ', points', count, '/', total);
            }
            count++;
        }
    });
    // transformData(result);
    return result;
};

const transformData = (data) => {
    for (let i = 0; i < data.geometry.coordinates.length; i++) {
        const polygons = data.geometry.coordinates[i];
        for (let j = 0; j < polygons.length; j++) {
            const polygon = polygons[j];
            for (let k = 0; k < polygon.length; k++) {
                const point = polygon[k];
                const latlon = worldToLatLon(point[0], point[1]);
                point[0] = Math.round(latlon.x);
                point[1] = Math.round(latlon.y);
            }
        }
    }
};