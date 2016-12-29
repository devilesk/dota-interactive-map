var request = require('request');
var config = require('../config.json');
var git = require('git-rev-sync');

var env = process.env.NODE_ENV == 'dev' ? 'development' : 'production';
console.log('NODE_ENV', env);

request.post({
    url:'https://api.rollbar.com/api/1/deploy/',
    form: {
        access_token: config.rollbar_token,
        environment: env,
        revision: git.long(),
        local_username: config.local_username,
        rollbar_username: config.rollbar_username
    }
});