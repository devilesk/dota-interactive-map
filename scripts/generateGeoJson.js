'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var VisionSimulation = _interopDefault(require('dota-vision-simulation'));
var worlddata = _interopDefault(require('dota-vision-simulation/src/worlddata.json'));
var union = _interopDefault(require('@turf/union'));
var fs = _interopDefault(require('fs'));

const vs = new VisionSimulation(worlddata);
vs.initialize("assets/img/map_data_720.png", () => {
  let t1 = Date.now();
  generateGeoJSON(vs, [vs.gridnav, vs.tools_no_wards], 'no_wards.json');
  console.log('no_wards.json', Date.now() - t1 + 'ms');
  t1 = Date.now();
  generateGeoJSON(vs, [vs.ent_fow_blocker_node], 'ent_fow_blocker_node.json');
  console.log('ent_fow_blocker_node.json', Date.now() - t1 + 'ms');
});

const generateGeoJSON = (vs, grids, dst) => {
  let result = null;
  grids.forEach((data, index) => {
    const total = Object.keys(data).length;
    let count = 0;

    for (let i in data) {
      const pt = vs.key2pt(i);
      const worldXY = vs.GridXYtoWorldXY(pt.x, pt.y);
      const poly = {
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [[[worldXY.x - 32, worldXY.y - 32], [worldXY.x - 32, worldXY.y + 32], [worldXY.x + 32, worldXY.y + 32], [worldXY.x + 32, worldXY.y - 32], [worldXY.x - 32, worldXY.y - 32]]]
        }
      };

      if (result == null) {
        result = poly;
      } else {
        result = union(result, poly);
      }

      if (count % 200 === 0) {
        console.log('grids', index, '/', grids.length, ', points', count, '/', total);
      }

      count++;
    }
  }); //transformData(result);

  fs.writeFile(dst, JSON.stringify(result), err => {});
};
