exports.index = function () {
  if (this.session.user) {
    var user = this.session.user;
    if('ClassName' in user){
      var {ClassName} = user;
      switch(ClassName.toLowerCase()){
        case 'chef':
          return this.redirect(`/chef`);
        break;
        case 'manager':
          return this.redirect(`/manager`);
        break;
        case 'waiter':
          return this.redirect(`/table`);
        break;
        case 'busboy':
          return  this.redirect(`/table`);
        break;
        default:
          return  this.redirect(`/table`);
        break;
      }
    }
    return this.redirect('/user');
  }

  this.render('index', { sitename: '登陆' });
};

exports.employeeLogin = function () {
  this.render('employee', { sitename: '员工登陆' });
};

exports.signout = function () {
  this.session.user = null;
  this.redirect('/');
};

exports.signup = function () {
  this.render('signup', { sitename: '注册' });
};

exports.queue = function () {
  this.render('queue', { sitename: '预订单队列' });
};
