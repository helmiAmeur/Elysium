const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;

const utils = require('./utils.js');

module.exports = (options) => ({
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['node_modules'],
        mainFields: [ 'es2015', 'browser', 'module', 'main'],
        alias: utils.mapTypescriptAliasToWebpackAlias()
    },
    stats: {
        children: false
    },
    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: '@ngtools/webpack'
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: {
                        caseSensitive: true,
                        removeAttributeQuotes:false,
                        minifyJS:false,
                        minifyCSS:false
                    }
                },
                exclude: utils.root('src/main/webapp/index.html')
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
                loader: 'file-loader',
                options: {
                    digest: 'hex',
                    hash: 'sha512',
                    name: 'content/[hash].[ext]',
                    esModule: false
                }
            },
            {
                test: /manifest.webapp$/,
                loader: 'file-loader',
                options: {
                    name: 'manifest.webapp'
                }
            },
            // Ignore warnings about System.import in Angular
            { test: /[\/\\]@angular[\/\\].+\.js$/, parser: { system: true } },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `'${options.env}'`,
                BUILD_TIMESTAMP: `'${new Date().getTime()}'`,
                // APP_VERSION is passed as an environment variable from the Gradle / Maven build tasks.
                VERSION: `'${process.env.hasOwnProperty('APP_VERSION') ? process.env.APP_VERSION : 'DEV'}'`,
                DEBUG_INFO_ENABLED: options.env === 'development',

                SERVER_API_URL: `''`
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './node_modules/swagger-ui-dist/*.{js,css,html,png}', to: 'swagger-ui', flatten: true, globOptions: { ignore: ['**/index.html'] }},
                { from: './node_modules/axios/dist/axios.min.js', to: 'swagger-ui' },
                { from: './src/main/webapp/swagger-ui/', to: 'swagger-ui' },
                { from: './src/main/webapp/content/', to: 'content' },
                { from: './src/main/webapp/favicon.ico', to: 'favicon.ico' },
                { from: './src/main/webapp/manifest.webapp', to: 'manifest.webapp' },
                { from: './src/main/webapp/robots.txt', to: 'robots.txt' }
            ],
        }),
        new HtmlWebpackPlugin({
            template: './src/main/webapp/index.html',
            chunks: ['polyfills', 'main', 'global'],
            chunksSortMode: 'manual',
            inject: 'body',
            base: '/',
        }),
        new AngularCompilerPlugin({
            mainPath: utils.root('src/main/webapp/app/app.main.ts'),
            tsConfigPath: utils.root('tsconfig.app.json'),
            sourceMap: true
        })
    ]
});
