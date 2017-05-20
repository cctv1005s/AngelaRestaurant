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
pool._query_ = pool.query;
pool.query = function(sql,fn){
    console.log(`-----------${sql.trim()}------------`);
    return pool._query_(sql,fn);
}
var p = wrapper(pool);

exports = module.exports = p;