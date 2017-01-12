var request = require('request');
var config = require('../config.json');
var git = require('git-rev-sync');

var env = process.argv.indexOf('production') !== -1 ? 'production': 'development';
console.log('env', env);

request.post({
    url:'https://api.rollbar.com/api/1/deploy/',
    form: {
        access_token: config.rollbar.server_token,
        environment: env,
        revision: git.long(),
        local_username: config.rollbar.local_username,
        rollbar_username: config.rollbar.username
    }
});