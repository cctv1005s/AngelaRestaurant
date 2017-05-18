import React, { Component } from 'react';
import TypeList from './TypeList.js';
import List from './List.js';
import Detail from './Detail.js';
import fn from './fn.js';

export default class Index extends Component {
  constructor(p) {
      super(p);
  }
  
  render() {
      return (
          <div className="manager-end">
              <TypeList />
              <List />
              <Detail />
            </div>
        );
    }
}

//定义专属方法
global.fn = fn;

fn.getTypeList = function(){
    return $.get('/api/v1/menu/type')
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
                return res.data;
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
