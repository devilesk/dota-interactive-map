require('dotenv').config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' });
const path = require('path');
const execSync = require('child_process').execSync;
const del = require('del');

// clean and move to deploy directory
const normalizedPath = path.normalize(process.env.DEPLOY_PATH);
const paths = [`${normalizedPath}/**/*`];
console.log('Deploying to', paths);
del.sync(paths, { force: true });
execSync(`mkdir -p ${normalizedPath} && cp -r build/* ${normalizedPath}`);
