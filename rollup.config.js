import commonjs from 'rollup-plugin-commonjs';
import config from './config.json';
import json from 'rollup-plugin-json';
import git from 'git-rev-sync';
import pkg from './package.json';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

const env = process.env.BUILD;

export default {
  input: 'src/js/index.js',
  output: {
    name: config.appName,
    file: env === 'production' ? 'dist/bundle-' + git.short() + '.min.js' : 'www/bundle.js',
    format: 'umd',
    strict: false,
    sourcemap: true
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
    env === 'production' && uglify()
  ]
};