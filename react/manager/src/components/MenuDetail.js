import React, { Component } from 'react';


/**
 * 用于翻译名称
 */
var translate = {
    Description:'描述',
    Name:'名称',
    Price:'价格',
    Status:'状态'
};
/**
 * 用于显示经理管理界面的中间的界面
 */
export default class MenuDetail extends Component {
  itemDelete(ID){
    return function(e){
        store.dispatch({
            type:'ItemDelete',
            data:ID
        });
    }
  }

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
                    <form className="am-form am-form-horizontal">
                        <legend>基本信息</legend>
                        {
                            item.ID
                        }
                        {
                            ['Description','Name','Price','Status'].map(function(ele,i){
                                return (
                                    <div className="am-form-group">    
                                        <label for="doc-ipt-3" className="am-u-sm-2 am-form-label">
                                            {translate[ele]}
                                        </label>
                                        <div className="am-u-sm-10">
                                        <input type="text" placeholder={translate[ele]} value={item[ele]}/>
                                        </div>
                                    </div>
                                );
                            })
                        }
                        <div className="am-form-group">
                            <div className="am-u-sm-10 am-u-sm-offset-2">
                            <button type="submit" className="am-btn am-btn-primary">更改</button>
                            </div>
                        </div>
                        <div className="am-form-group">
                            <div className="am-u-sm-10 am-u-sm-offset-2">
                            <button 
                             type="submit" 
                             className="am-btn am-btn-danger" 
                             onClick={this.itemDelete(item.ID).bind(this)}
                             >
                                删除
                            </button>
                            </div>
                        </div>
                    </form>
              </div>
            </div>
        );
    }
}
