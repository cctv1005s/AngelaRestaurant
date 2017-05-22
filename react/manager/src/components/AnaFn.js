// 用于处理菜单的选择部分
var fn = {};

fn._SetState = (state) => {
  store.dispatch({
    type: 'SetState',
    data: state,
  });
};

fn.UpdateState = (state) => state;

fn.TypeSelect = (state, action) => {
  var ID = action.data;
  state.activeType = ID;
  return state;
};


fn.SetState = function (state, action) {
  return action.data;
};

fn['@@redux/INIT'] = function (state, action) {
  state = {
    typeList:[{ID:0,Name:'餐厅信息统计',ClassDescription:" "}],
    activeType:0,
    itemList:[
      {
        ID:0,
        Name:'历史菜品分布',
        Discription:"",
        Href:'/statistics/dish',
        Img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495467663702&di=769b8dcbb6415b791830240ca6b8bbcd&imgtype=0&src=http%3A%2F%2Fs2.sinaimg.cn%2Fbmiddle%2F654db8f9tbac6490ff9e1%26690'
      },
      {
        ID:1,
        Name:'三日内菜品销量',
        Discription:"",
        Href:'/statistics/column',
        Img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496062413&di=3942f8fda6f4a79537b109db91b9f5e6&imgtype=jpg&er=1&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F7a899e510fb30f2488b7c564c995d143ad4b03a3.jpg'
      },
      {
        ID:2,
        Name:'员工类别分布',
        Discription:"",
        Href:'/statistics/employee',
        Img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496065833&di=3a56a0699020348903c94ed4fb893d35&imgtype=jpg&er=1&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D71892a9e9245d688a357baa091f25128%2F4ec2d5628535e5dd5565467276c6a7efcf1b62d6.jpg'
      }
      ],
    activeItem:0
  }

  return state;
};

fn.ItemSelect = (state, action) => {
  var ID = action.data;
  state.activeItem = ID;
  return state;
};

export default fn;
