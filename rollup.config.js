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
      'ol/proj/Projection': 'ol.proj.Projection',
      'ol/extent': 'ol.extent',
      'ol/geom/Point': 'ol.geom.Point',
      'ol/style/Style': 'ol.style.Style',
      'ol/style/Fill': 'ol.style.Fill',
      'ol/style/Stroke': 'ol.style.Stroke',
      'ol/style/RegularShape': 'ol.style.RegularShape',
      'ol/style/Icon': 'ol.style.Icon',
      'ol/style/Circle': 'ol.style.Circle',
      'ol/Observable': 'ol.Observable',
      'ol/geom/Polygon': 'ol.geom.Polygon',
      'ol/geom/LinearRing': 'ol.geom.LinearRing',
      'ol/Feature': 'ol.Feature',
      'ol/source/Vector': 'ol.source.Vector',
      'ol/layer/Vector': 'ol.layer.Vector',
      'ol/geom/LineString': 'ol.geom.LineString',
      'ol/geom/Circle': 'ol.geom.Circle',
      'ol/interaction/Draw': 'ol.interaction.Draw',
      'ol/Overlay': 'ol.Overlay',
      'ol/geom/MultiPolygon': 'ol.geom.MultiPolygon',
      'ol/control/MousePosition': 'ol.control.MousePosition',
      'ol/coordinate': 'ol.coordinate',
      'ol/format/GeoJSON': 'ol.format.GeoJSON',
      'ol/layer/Group': 'ol.layer.Group',
      'ol/Collection': 'ol.Collection',
      'ol/View': 'ol.View',
      'ol/Map': 'ol.Map',
      'ol/source/TileImage': 'ol.source.TileImage',
      'ol/layer/Tile': 'ol.layer.Tile',
      'ol/tilegrid/TileGrid': 'ol.tilegrid.TileGrid',
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