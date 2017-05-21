var mysql = require('../models/index')

exports.getall=function*(){
    var sql =`select *
    from EmployeeClass`;
    
    return yield mysql.query(sql);
}
exports.addtype=function* (newClass){
    
    var sql=`insert into 
    EmployeeClass (ID,ClassName,ClassDescription)
    values ('${newClass.ID}','${newClass.ClassName}','${newClass.ClassDescription}')
    `;
    
    return yield mysql.query(sql);
}
exports.getstaffdetail=function* (id){
    
    var sql=`select *
    from View_Employee
    where ID='${id}'`;
    return yield mysql.query(sql); 
}
exports.addemployee=function* (newem){
    var sql=`insert into Employee (ID,Account,Password,Status,Name,Salary,Phone,BankCard,WorkTime,HeadIcon,ClassID,AccessToken)
    values ('${newem.ID}',
    '${newem.Account}',
    '${newem.Password}',
    '${newem.Status}',
    '${newem.Name}',
    '${newem.Salary}','${newem.Phone}','${newem.BankCard}','${newem.WorkTime}','${newem.HeadIcon}','${newem.ClassID}','${newem.AccessToken}')
    `;
    return yield mysql.query(sql);
}
exports.updateEmployee=function*(set,id){
    
    var sql=`update Employee set ${set} where ID=${id}`;
    return yield mysql.query(sql);
}
exports.deleteEmployee=function*(id){
    
    var sql=`delete from Employee where ID='${id}'`;
    return yield mysql.query(sql);
}