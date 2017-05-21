var mysql=require('../models/index');
exports.getallcookinglist=function*(){
    var sql=`select * from View_CookingList`;
    return yield mysql.query(sql);
}
