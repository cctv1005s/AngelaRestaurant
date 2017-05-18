var fn = {};

fn.TypeSelect = (state, action) => {

};

fn.TypeRename = function (state, action) {

};


fn.TypeDelete = function (state, action) {

};

fn.TypeAdd = function (state, action) {

};

fn.SetState = function (state,action){
  return action.data;
}

fn['@@redux/INIT'] = function(state,action){
  fn.getTypeList()
  .then(function(data){
    state.typeList = data;
    state.activeType = data[0].ID;
    fn.getItemList(state.activeType)
      .then(data =>{

      });
  });

  return state;
}

export default fn;
