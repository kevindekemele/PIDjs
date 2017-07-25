const webpack = require('webpack');

module.exports ={
    devtool: 'source-map',
    entry:'./example/src/app.js',

    output:{
        path:__dirname +'/example/dist',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test:/\js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
};