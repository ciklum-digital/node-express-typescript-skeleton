const path = require('path');
const merge = require('webpack-merge');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// Short usage reference
// `NODE_ENV` = development | test | production
// `LOG_LEVEL` = error | warn | info | debug

/** @type {import('webpack').Configuration} */
const config = {
    context: __dirname,
    entry: {
        bundle: './src/index.ts'
    },
    name: 'svc',
    target: 'node',
    cache: true,
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['src', 'node_modules'],
        plugins: [
            new TsConfigPathsPlugin({
                configFile: path.join(__dirname, 'tsconfig.json')
            })
        ]
    },
    output: {
        path: path.join(__dirname, './dist/svc'),
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader',
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            }
        ],
        noParse: [
            /\.(spec|e2e)\.js$/,
            /LICENSE/,
            /README.md/
        ]
    },
    node: {
        fs: 'empty',
        global: true,
        crypto: 'empty',
        process: true,
        console: true,
        module: false,
        clearImmediate: false,
        setImmediate: false,
        __dirname: false,
        __filename: false
    },
    plugins: [
        new LoaderOptionsPlugin({
            debug: true,
        }),
    ]
};

console.log('Building svc bundle...');
console.log(`[${process.env.NODE_ENV}] config used...`);

let finalCfg;
if (process.env.NODE_ENV === 'production') {
    // minification not used because it does not work
    finalCfg = config;
} else {
    finalCfg = merge(config, {
        devtool: 'inline-source-map'
    });
}

module.exports = finalCfg;
