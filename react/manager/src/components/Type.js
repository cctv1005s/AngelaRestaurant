import React, { Component } from 'react';
/**
 * 用于显示某一个类别的具体信息和操作
 */
export default class TypeList extends Component {
  render() {
      var { ID, Name } = this.props;
      var {activeType} = store.getState();
      var active = ID == activeType ? true : false;
      return (
          <div 
           className={`item ${active ? 'active':''}`}
           onClick={()=>{
               //选择新的条目
               store.dispatch({
                    type:'TypeSelect',
                    data:ID
               });
           }}
          >
              <span className="item-name" >{Name}</span>
              {
                    (() => {
                      if (!this.props.active)
                          return null;
                      return (
                          <button
                              className="item-setting-btn am-icon-gear"
                              onClick={() => { $(this.refs.setting).toggleClass('hidden'); }}
                             />
                        );
                    })()
                }

              <div className="item-setting hidden" ref="setting">
                  <div 
                   className="rename" 
                   onClick={()=>{
                       store.dispatch({
                           type:'TypeRename',
                           data:ID
                       });
                   }}
                  >修改名称</div>
                  <div 
                   className="delete" 
                   onClick={()=>{
                        store.dispatch({
                        type:'TypeDelete',
                        data:ID
                        });
                   }}
                  >删除</div>
                </div>
            </div>
        );
    }
}
