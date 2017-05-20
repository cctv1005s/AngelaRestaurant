const userModel = require('../proxy/user.js');
const employeeModel = require('../proxy/employee.js');

exports.token2session = function* (next) {
  
  var { Token } = this.request.body;
  if (!Token)
    return yield next;

  //  在顾客中查找
  var r = yield userModel.findByToken(Token);
  if (r.length === 1) {
    this.session.user = r[0];
    this.session.role = "customer";
    yield next;
  }

  //  在服务员中查找
  r = yield employeeModel.findByToken(Token);
  if (r.length === 1){
    this.session.user = r[0];
    this.session.role = "employee";
  }
  yield next;
};
