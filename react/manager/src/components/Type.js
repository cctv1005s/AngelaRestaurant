import React, { Component } from 'react';
/**
 * 用于显示某一个类别的具体信息和操作
 */
export default class TypeList extends Component {
  render() {
    var { ID, Name,Discription} = this.props;
    var { activeType } = store.getState();
    var active = ID == activeType;
    var showDiscription = Discription.length >= 5 ? (Discription||"").substr(0,5)+"..." : Discription;
    return (
        <div
            className={`item ${active ? 'active' : ''}`}
            onClick={() => {
             // 选择新的条目
             $(this.refs.setting).addClass('hidden');
             store.dispatch({
                 type: 'TypeSelect',
                 data: ID,
               });
           }}
          >
            <span className="item-name" >{Name}({showDiscription})</span>
            {
                    (() => {
                      //如果没有被选中，那么就不显示设置的齿轮
                      if (!active)
                        return null;
                      return (
                        <button
                            className="item-setting-btn am-icon-gear"
                            onClick={(e) => {
                                e.stopPropagation();
                                $(this.refs.setting).toggleClass('hidden');
                              }}
                          />
                      );
                    })()
                }

            <div className="item-setting hidden" ref="setting">
                <div
                    className="rename"
                    onClick={(e) => {
                     e.stopPropagation();
                     $(this.refs.setting).toggleClass('hidden');
                     store.dispatch({
                         type: 'TypeRename',
                         data: ID,
                         _name: Name,
                         _discription: Discription,
                       });
                   }}
                  >修改名称</div>
                <div
                    className="delete"
                    onClick={(e) => {
                     e.stopPropagation();
                     $(this.refs.setting).toggleClass('hidden');
                     store.dispatch({
                          type: 'TypeDelete',
                          data: ID,
                        });
                   }}
                  >删除</div>
              </div>
          </div>
      );
  }
}
