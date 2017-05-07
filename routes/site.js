exports.index = function () {
  if (this.session.user) {
    return this.redirect('/user');
  }
  this.render('index', { sitename: '登陆' });
};

exports.employeeLogin = function () {
  this.render('employee', { sitename: '员工登陆' });
};

exports.signout = exports.signup = exports.signin = function* (next) {
  this.render('index', { title: '你好呀' });
};
