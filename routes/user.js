exports.index = function* () {
  this.render('user/index', { sitename: '用户首页' });
};

exports.reserve = function* () {
  this.render('user/reserve', { sitename: '预定', phone: this.session.user.Phone || '' });
};

exports.tokenid = function* () {
  var { AccessToken } = this.session.user;
  this.render('user/tokenid', { sitename: '现场点单', AccessToken });
};


exports.profile = function* () {
  var data = this.session.user;
  var role = 'customer';
  if ('Salary' in data) {
    role = 'employee';
  }
  switch (role) {
    case 'customer':
      this.render('user/customer_profile', { sitename: '个人资料', data });
      break;
    case 'employee':
      this.render('user/employee_profile', { sitename: '个人资料', data });
      break;
    default:
      this.render('user/customer_profile', { sitename: '个人资料', data });
      break;
  }
};
