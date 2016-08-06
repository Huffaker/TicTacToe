// Imports for Webpack Development Server
import webpack from 'webpack';
import devServer from 'webpack-dev-middleware';
import hotServer from 'webpack-hot-middleware';
import staticFiles from 'serve-static';
import config from 'config';
import webpackConfig from '../webpack.config.js';

/**
 * Links the webpack hot reload service into the express app
 * @param {express.Router} app the express application
 * @returns {express.Router} the express application
 */
function linkStaticFiles(app) {
    //if (config.env === 'development') {
        var compiler = webpack(webpackConfig);

        app.use(devServer(compiler, {
            hot: true,
            filename: 'bundle.js',
            publicPath: webpackConfig.output.publicPath || '/',
            stats: { colors: true },
            historyApiFallback: true,
        }));

        app.use(hotServer(compiler, {
            log: console.log,
            path: '/__webpack_hmr',
            heartbeat: 10 * 1000,
        }));
    // } else {
    //     app.use(staticFiles('dist', {
    //         dotfile: 'ignore',
    //         etag: true,
    //         index: false,
    //         lastModified: true
    //     }));
    // }

    return app;
}

export default linkStaticFiles;