var wrapper = require('co-mysql')
    ,mysql = require('mysql')
    ,fs = require('fs')
    ,path = require('path');
var options = {
    'host':'localhost',
    'port':'6700',
    'user':'root',
    'password':'password',
    'database':'angela'
};


var pool = mysql.createPool(options);
var p = wrapper(pool);

var buffer = fs.readFileSync(path.join(__dirname,'./user.sql'));
var sql = buffer.toString();

p.query(sql).catch(function(e){
    
});

exports = module.exports = p;