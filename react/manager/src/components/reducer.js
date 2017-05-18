var defaultState = {
  typeList:[],
  activeType:-1,
  itemList:[],
  activeItem:-1
};

var initAction = {
  type:'InitState'
};

var fn = global.fn;

export default function (state = defaultState, action = initAction) {
  return fn[action.type](state, action);
}
