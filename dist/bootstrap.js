import args from 'shell-arguments';
import config from 'config';
import http from 'http';
import createWebApplication from '../server/serv';

// Command line arguments come in via shell-arguments.  Everything else
// comes in via config.  We need to copy the shell-arguments to the config
// for the known arguments.
if (typeof args.port !== 'undefined') {
    config.port = args.port;
}

// createWebApplication() returns a Promise which resolves to an express
// Application.  We need to connect that to the HTTP endpoint.
createWebApplication().then(app => {
    app.set('port', config.get('port'));

    let server = http.createServer(app);
    server.on('error', error => {
        if (error.syscall && error.code) {
            console.error(`System Error while creating HTTP Server: ${error.syscall} ${error.code} ${error.message}`);
        }
        throw error;
    });
    server.on('listening', function () {
        let addr = server.address();
        console.info(`Listening on port: ${addr.family}/(${addr.address}):${addr.port}`);
    });

    server.listen(app.get('port'));
});