
var order_model = require('../proxy/order');
var uuidV1 = require('uuid/v1');


exports.reserve = function*(next){
    var {PeopleNum,Phone,OrderTime} = this.request.body;

    if(PeopleNum<1||PeopleNum>20)
      return this.body = {success:false,data:'预订人数范围为1-20人'};

    if(Phone.length != 11)
      return this.body = {success:false,data:'电话号码错误'};


    var OrderDate = new Date(OrderTime);
    var NowDate = new Date();
    var days = Math.floor(((OrderDate.getTime()-NowDate.getTime())
        /(24*3600*1000)));
    if(days<1||days>7)
        return this.body = {success:false,data:'请预订七天以内的时间'};


    var UserId = '1';
    var reserveOrder = yield order_model.setReserve({
        OrderID:uuidV1(),
        UserId:UserId,
        OrderTime:OrderTime,
        Phone:Phone,
        Type:1,
        Status:'正在进行',
        PeopleNum:PeopleNum,
    });

    this.body = {success:true,data:reserveOrder};

}

