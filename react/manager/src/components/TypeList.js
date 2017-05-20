import React, { Component } from 'react';
import Type from './Type.js';

/**
 * 用于显示经理管理界面的侧边栏
 */
export default class TypeList extends Component {
  typeAdd(e){
    store.dispatch({
        type:'TypeAdd'
    });
  }

  render() {
    var {typeList} = store.getState();
    return (
        <div className="manager-end-left" style={{ height: $(window).height() - 50 }}>
            <div 
             className="title"
             onClick={this.typeAdd}
            >
                + 新建类别
            </div>
            <div className="manager-end-type">
            {
                typeList.map((ele, i) => (
                    <Type
                      key = {i}
                      Name = {ele.Name}
                      ID = {ele.ID}
                    />
                ))
             }
            </div>
         </div>
      );
  }
}
