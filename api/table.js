var userModel = require('../proxy/user.js');

exports.bind = function* () {
  var id = this.session.user.ID;//服务员的id
  var {AccessToken} = this.request.body;
  //获取被绑定的用户的ID
  var res = yield userModel.findByToken(AccessToken);
  if(res.length === 0)
    return this.body = {success:false,data:"找不到用户"}
};
