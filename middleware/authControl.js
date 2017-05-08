var authModel = require('../proxy/auth');
/**
 * 查询用户需要的权限
 *
 * @param {string} auth -需要的权限
 */
exports.authRequired = function (auth) {
  return function* (next) {
    
    if (!this.session.user) {
      return this.body = { success: false, data: '没有登录' };
    }
    //  如果不写入权限，默认只需要登录就可以了
    if (!auth)
      return yield next;
    try{
      let user = this.session.user;
      let ID = user.ID;
      //  查询数据库
      let authList = yield authModel.getAuth(ID);
      //  查询权限
      for (let i = 0; i < authList.length; i += 1) {
        if (authList[i].Auth == auth)
          return yield next;
      }
    }catch(e){
      console.error(e);
    }
    return this.body = { success: false, data: '权限不足' };
  };
};
