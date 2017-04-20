var wrapper = require('co-mysql')
    ,mysql = require('mysql')
    ,fs = require('fs')
    ,path = require('path')
    ,config = require('../config.json');

var config = config.db;

var options = {
<<<<<<< HEAD
    'host':'www.jyonline.cc',
    'port':'6700',
    'user':'root',
    'password':'password',
    'database':'angela'
=======
    'host':config.host,
    'port':config.port,
    'user':config.user,
    'password':config.password,
    'database':config.database
>>>>>>> 255d615f70288eca9743685cbdf4693374280f99
};


var pool = mysql.createPool(options);
var p = wrapper(pool);

exports = module.exports = p;