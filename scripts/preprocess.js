require('dotenv').config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' });
const pp = require('preprocess');
const git = require('git-rev-sync');

const context = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'development',
    COMMIT_HASH: git.short(),
};
pp.preprocessFileSync('src/template/index.html', 'build/index.html', context);
pp.preprocessFileSync('src/template/index.j2', 'build/index.j2', context);
