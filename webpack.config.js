'use strict';
module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + '/react/index.js', //唯一入口文件
    output: {
        path: __dirname + '/public/js', //打包后的文件存放的地方
        filename: 'menu.js' //打包后输出文件的文件名
    },
    module: {
        loaders: [
            { test: /\.js$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                presets: ['es2015','react']
              }
            },
        ]
    },
    devServer: {
        // contentBase: './src/views'  //本地服务器所加载的页面所在的目录
        port: 8888,
        colors: true,  //终端中输出结果为彩色
        historyApiFallback: true,  //不跳转
        inline: true  //实时刷新
    }
}
