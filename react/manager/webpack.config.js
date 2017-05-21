
'use strict';
module.exports = {
    entry: __dirname + '/src/entry.js', //唯一入口文件
    output: {
        path: __dirname + '/../../public/js', //打包后的文件存放的地方
        filename: 'manager.js' //打包后输出文件的文件名
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: "jsx!babel", include: /src/},
        ]
    }
}
