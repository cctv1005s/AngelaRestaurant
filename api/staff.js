var uuidV1=require('uuid/v1');
var shortid=require('shortid');
var md5=require('md5');
var staff_model=require('../proxy/staff');
var auth_model=require('../proxy/auth');
var configjson=require('../config.json');
exports.type=function*(next){
    try{
        var info=yield staff_model.getall();
        this.body={success:true,data:info};
    }catch (e){
        this.body={success:false,data:e};
    }
}
exports.addtype=function* (next){
    
    try {
        var { ClassName, ClassDescription } = this.request.body;
        
        var info = yield staff_model.addtype({
            ID: shortid.generate(),
            ClassName: ClassName,
            ClassDescription: ClassDescription
        });
        this.body = { success: true, data: info };
    }
    catch (e) {
        this.body = { success: false, data: e };
    }
}
exports.updateType=function*(){
     try{
        var body=this.request.body;
        var setstr='';
        console.log(this.request.body);
        var id=body['ID'];
        var arr=[];
        for (var i in body){
            
            arr.push(i+"='"+body[i]+"'");
        }
        setstr=arr.join(',');
        console.log(setstr);
        var info=yield staff_model.updatetype(setstr,id);
        this.body={success:true,data:info};
    }
    catch (e){
        this.body={success:false,data:e};
    }
}
exports.deletetype=function*(){
     try{
        var id=this.request.body['ID'];
        var info=yield staff_model.deletetype(id);
        this.body={success:true,data:info};
    }catch (e){
        this.body={success:false,data:e};
    }

}
exports.getemDetail=function* (){
    var id =this.params.id;
    
    try{
        var emdetail=yield staff_model.getstaffdetail(id);
        this.body={success:true,data: emdetail};
    }catch (e){
        this.body={success:false,data:e};
    }
}
exports.getemployeebyclass=function*(){
    var classID=this.request.body.ClassID;
    try {
        var info=yield staff_model.findemployeebyclass(classID);
        this.body={success:true,data:info};

    } catch (e) {
        this.body={success:false,data:e};

    }
}
exports.addemployee=function*(next){

    try{
        var {Account,Password,Status,Name,Salary,Phone,BankCard,
        WorkTime,HeadIcon,ClassID}=this.request.body;
        console.log(this.request.body);
        var generateID=shortid.generate();
        var info=yield staff_model.addemployee({
            ID:generateID,
            Account:Account||'NULL',
            Password:md5(Password)||'NULL',
            Status:Status||'REST',
            Name:Name||'UNKNOWNAME',
            Salary:Salary||'0',
            Phone:Phone||'NULL',
            BankCard:BankCard||'NULL',
            WorkTime:WorkTime||'NULL',
            HeadIcon:HeadIcon||'NULL',
            ClassID:ClassID||'NULL',
            AccessToken:shortid.generate()
        });
        var role=configjson.role;
        console.log(role);
        var res=yield staff_model.getstaffdetail(generateID);
        console.log(res);
        if (role[res[0]['ClassName']]){
            var types=role[res[0]['ClassName']];
            console.log(types);
            for (var type in types) {
                yield auth_model.addAuth(generateID,types[type]);
            }
        }
        
        this.body={success:true,data:info};
    }catch (e){
        this.body={success:false,data:e};
    }
}
exports.updateEmployee=function*(next){
    
     try{
        var body=this.request.body;
        var setstr='';
        console.log(this.request.body);
        var id=body['ID'];
        var arr=[];
        if(body['Password']){
            body['Password']=md5(body['Password']);
        }
        for (var i in body){
            
            arr.push(i+"='"+body[i]+"'");
        }
        setstr=arr.join(',');
        console.log(setstr);
        var info=yield staff_model.updateEmployee(setstr,id);
        this.body={success:true,data:info};
    }
    catch (e){
        this.body={success:false,data:e};
    }
}
exports.deleteEmployee=function*(){
    try{
        var id=this.request.body['ID'];
        var info=yield staff_model.deleteEmployee(id);
        this.body={success:true,data:info};
    }catch (e){
        this.body={success:false,data:e};
    }

}
exports.addDishForChef=function*(){
    try {
        var chefid =this.request.body['ChefID'];
        var dishid=this.request.body['DishID'];
        var infor=yield staff_model.adddishforchef(chefid,dishid);
        this.body={success:true,data:info};
    } catch (e) {
        this.body={success:false,data:e};
    }
}