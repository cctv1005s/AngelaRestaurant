var wrapper = require('co-mysql')
    ,mysql = require('mysql')
    ,fs = require('fs')
    ,path = require('path')
    ,config = require('../config.json');

var config = config.db;

var options = {
    'host':config.host,
    'port':config.port,
    'user':config.user,
    'password':config.password,
    'database':config.database
};


var pool = mysql.createPool(options);
var p = wrapper(pool);

exports = module.exports = p;