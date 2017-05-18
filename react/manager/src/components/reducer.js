import MenuFn from './MenuFn.js';
import StaffFn from './StaffFn.js';

var defaultState = {
  typeList:[],
  activeType:-1,
  itemList:[],
  activeItem:-1
};

var initAction = {
  type:'InitState'
};

export default function (state = defaultState, action = initAction) {
  var fn = {};
  var href = window.location.href;
  if(href.indexOf('staff')){
      fn = StaffFn;
  }else{
      fn = MenuFn;
  }
  return fn[action.type](state, action);
}
