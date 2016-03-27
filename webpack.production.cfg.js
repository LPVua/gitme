var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('assets/css/[name].css');
module.exports = {
    output: {
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.html$/,
                loader: "html-minify!file?context=src&name=[path][name].[ext]"
            },
            {
                test: /\.scss$/,
                loader: extractCSS.extract(['css','sass'])
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(
            {
                mangle: true,
                compress: {
                    warnings: false, // Suppress uglification warnings
                }
            }
        ),
        new CleanPlugin('dist'),
        extractCSS
    ],
    sassLoader: {
        includePaths: ['src/app/sass']
    },
    'html-minify-loader': {
        empty: true,        // KEEP empty attributes
        cdata: true,        // KEEP CDATA from scripts
        comments: false,     // KEEP comments
        dom: {                            // options of !(htmlparser2)[https://github.com/fb55/htmlparser2]
            lowerCaseAttributeNames: true,      // do not call .toLowerCase for each attribute name (Angular2 use camelCase attributes)
        }
    }
};