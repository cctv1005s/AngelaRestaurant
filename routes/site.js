exports.index = function () {
  if (this.session.user) {
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
