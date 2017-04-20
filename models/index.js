var wrapper = require('co-mysql')
    ,mysql = require('mysql')
    ,fs = require('fs')
    ,path = require('path');
var options = {
    'host':'www.jyonline.cc',
    'port':'6700',
    'user':'root',
    'password':'password',
    'database':'angela'
};


var pool = mysql.createPool(options);
var p = wrapper(pool);

exports = module.exports = p;