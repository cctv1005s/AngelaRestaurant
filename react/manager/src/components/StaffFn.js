//用于处理菜单的选择部分
var fn = {};

fn._SetState = (state) =>{
  store.dispatch({
    type:'SetState',
    data:state
  });
}

fn.UpdateState = (state,action) =>{
  return state;
}

fn.TypeSelect = (state, action) => {
  var ID = action.data;
  state.activeType = ID;
  fn.getItemList(ID)
    .then((data) =>{
      state.itemList = data;
      state.activeItem = ( data[0] || {} ).ID;
      fn._SetState(state);
  });
  return state;
};

fn.TypeRename = function (state, action) {
  var ID = action.data;
  var name = prompt("请输入新的类别名",action.__name);
  
  state.typeList.map(function(ele){
    if(ele.ID == ID)
      ele.Name = name;
  });

  $.post('/api/v1/menu/type/update',{ID:ID,ClassName:name})
   .then(res =>{
      if(!res.success)
        alert("修改失败" +res.data)
   });
   return state;
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
        state.itemList = data;
        state.activeItem = data[0].ID;
        store.dispatch({
          type:'SetState',
          data:state
        });
      });
  });
  return state;
}


fn.ItemAdd = ()=>{
  
}

fn.ItemSelect = (state,action)=>{
  var ID = action.data;
  state.activeItem = ID;
  return state;
}

fn.getTypeList = function(){
    return $.get('/api/v1/staff/type')
     .then((res) =>{
         if(!res.success)
            return alert("获取数据失败，请重试");
         var data = res.data;
         for(var i in data){
             data[i].Name = data[i].ClassName;
         }
         return data;
     });
};

fn.getItemList = function(type){
    return $.get(`/api/v1/menu/type/${type}`)
            .then(res =>{
                if(!res.success)
                    alert("获取数据失败,请重试");
                     
                var data = res.data;
                for(var i in data){
                    data[i].Img = (data[i].Imgs[0]||{}).ImgUrl;
                }
                return data;
            });
}

fn.getItem = function(ID){
    return $.get(`/api/v1/menu/dish/${type}`)
            .then(res =>{
                if(!res.success)
                    alert("获取数据失败，请重试");
                return res.data;
            });
}


export default fn;
