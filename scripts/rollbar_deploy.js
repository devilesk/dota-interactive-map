require('dotenv').config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' });
const request = require('request');
const git = require('git-rev-sync');

if (process.env.ROLLBAR_SERVER_TOKEN && process.env.ROLLBAR_LOCAL_USERNAME && process.env.ROLLBAR_USERNAME) {
    request.post({
        url: 'https://api.rollbar.com/api/1/deploy/',
        form: {
            access_token: process.env.ROLLBAR_SERVER_TOKEN,
            environment: process.env.NODE_ENV || 'development',
            revision: git.long(),
            local_username: process.env.ROLLBAR_LOCAL_USERNAME,
            rollbar_username: process.env.ROLLBAR_USERNAME,
        },
    });
}
else {
    console.log('No rollbar config.');
}
