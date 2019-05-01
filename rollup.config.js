import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import git from 'git-rev-sync';
import pkg from './package.json';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

require('dotenv').config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' });

export default {
    input: 'src/js/index.js',
    output: {
        name: process.env.APP_NAME,
        file: process.env.NODE_ENV === 'production' ? `build/bundle-${git.short()}.min.js` : 'build/bundle.js',
        format: 'umd',
        strict: false,
        sourcemap: true,
        globals: process.env.NODE_ENV === 'production' ? {} : {
            'ol/proj': 'ol.proj',
            'ol/proj/Projection': 'ol.proj.Projection',
            'ol/events/condition': 'ol.events.condition',
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
            'ol/format': 'ol.format',
            'ol/layer/Group': 'ol.layer.Group',
            'ol/Collection': 'ol.Collection',
            'ol/View': 'ol.View',
            'ol/Map': 'ol.Map',
            'ol/source/TileImage': 'ol.source.TileImage',
            'ol/layer/Tile': 'ol.layer.Tile',
            'ol/tilegrid/TileGrid': 'ol.tilegrid.TileGrid',
            'ol/control': 'ol.control',
            'ol/interaction': 'ol.interaction',
            'ol/interaction/Select': 'ol.interaction.Select',
            'ol/interaction/Pointer': 'ol.interaction.Pointer',
            'ol/geom/GeometryCollection': 'ol.geom.GeometryCollection',
            'ol/style/Text': 'ol.style.Text',
            'ol/color': 'ol.color',
        },
    },
    plugins: [
        replace({
            delimiters: ['#', ''],
            build_date: `${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')} UTC`,
            release_tag: pkg.version,
            code_version: git.long(),
            rollbar_client_token: process.env.ROLLBAR_CLIENT_TOKEN,
            rollbar_environment: process.env.NODE_ENV || 'development',
            enable_save: process.env.ENABLE_SAVE === 'true',
            enable_download: process.env.ENABLE_DOWNLOAD === 'true',
        }),
        resolve({ browser: true }),
        commonjs({}),
        json({}),
        process.env.NODE_ENV === 'production' && terser(),
    ],
    external: id => process.env.NODE_ENV !== 'production' && /ol\//.test(id),
    watch: { exclude: 'node_modules/**' },
};
