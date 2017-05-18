import React, { Component } from 'react';

/**
 * 用于显示经理管理界面的中间的界面
 */
export default class MenuDetail extends Component {
  render() {
      var { activeItem, itemList } = store.getState();
      var item = {};
      for(var i in itemList){
        if(activeItem == itemList[i].ID){
            item = itemList[i];
            break;
        }
      }
      return (
          <div className="manager-end-right">
              <div className="manager-end-detail">
                  <h1 contentEditable="true">{item.Name}</h1>
                </div>
              <button className="am-btn am-btn-success">确定</button>
              <button className="am-btn am-btn-danger">删除</button>
            </div>
        );
    }
}
