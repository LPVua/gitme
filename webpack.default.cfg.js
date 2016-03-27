module.exports = {
    watch: true,
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
                loader: "file?context=src&name=[path][name].[ext]"
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            }
        ]
    },
    sassLoader: {
        includePaths: [ 'src/app/sass' ]
    }
};