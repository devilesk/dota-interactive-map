import Rollbar from 'rollbar';

const rollbarConfig = {
    accessToken: '#rollbar_client_token',
    captureUncaught: true,
    ignoredMessages: [
        'Error:  DOM Exception 18',
        'SecurityError: DOM Exception 18: An attempt was made to break through the security policy of the user agent.',
        'SecurityError:  An attempt was made to break through the security policy of the user agent.',
        'Script error.',
    ],
    payload: {
        environment: '#rollbar_environment',
        client: {
            javascript: {
                source_map_enabled: true,
                code_version: '#code_version',
                // Optionally have Rollbar guess which frames the error was thrown from
                // when the browser does not provide line and column numbers.
                guess_uncaught_frames: true,
            },
        },
    },
};

let rollbar = {};
if ('#rollbar_client_token') {
    rollbar = new Rollbar(rollbarConfig);
}

export default rollbar;
