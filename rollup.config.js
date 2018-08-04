import commonjs from 'rollup-plugin-commonjs';
import config from './config.json';
import json from 'rollup-plugin-json';
import git from 'git-rev-sync';
import pkg from './package.json';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

const env = process.env.BUILD;

export default {
  input: 'src/js/index.js',
  output: {
    name: config.appName,
    file: env === 'production' ? 'dist/bundle-' + git.short() + '.min.js' : 'www/bundle.js',
    format: 'umd',
    strict: false,
    sourcemap: true,
    globals: env === 'production' ? {} : {
      'ol/proj': 'ol.proj',
      'ol/proj/projection': 'ol.proj.Projection',
      'ol/extent': 'ol.extent',
      'ol/geom/point': 'ol.geom.Point',
      'ol/style/style': 'ol.style.Style',
      'ol/style/fill': 'ol.style.Fill',
      'ol/style/stroke': 'ol.style.Stroke',
      'ol/style/regularshape': 'ol.style.RegularShape',
      'ol/style/icon': 'ol.style.Icon',
      'ol/style/circle': 'ol.style.Circle',
      'ol/observable': 'ol.Observable',
      'ol/geom/polygon': 'ol.geom.Polygon',
      'ol/geom/linearring': 'ol.geom.LinearRing',
      'ol/feature': 'ol.Feature',
      'ol/source/vector': 'ol.source.Vector',
      'ol/layer/vector': 'ol.layer.Vector',
      'ol/geom/linestring': 'ol.geom.LineString',
      'ol/geom/circle': 'ol.geom.Circle',
      'ol/interaction/draw': 'ol.interaction.Draw',
      'ol/overlay': 'ol.Overlay',
      'ol/geom/multipolygon': 'ol.geom.MultiPolygon',
      'ol/control/mouseposition': 'ol.control.MousePosition',
      'ol/coordinate': 'ol.coordinate',
      'ol/format/geojson': 'ol.format.GeoJSON',
      'ol/layer/group': 'ol.layer.Group',
      'ol/collection': 'ol.Collection',
      'ol/view': 'ol.View',
      'ol/map': 'ol.Map',
      'ol/source/tileimage': 'ol.source.TileImage',
      'ol/layer/tile': 'ol.layer.Tile',
      'ol/tilegrid/tilegrid': 'ol.tilegrid.TileGrid',
      'ol/control': 'ol.control',
      'ol/interaction': 'ol.interaction'
    }
  },
  plugins: [
    replace({
        delimiters: ['#', ''],
        build_date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + ' UTC',
        release_tag: pkg.version,
        code_version: git.long(),
        rollbar_client_token: config.rollbar.client_token || "",
        rollbar_environment: env
    }),
    resolve({browser: true}),
    commonjs({}),
    json({}),
    env === 'production' && terser()
  ],
  external: id => env !== 'production' && /ol\//.test(id),
  watch: {
    exclude: 'node_modules/**'
  }
};