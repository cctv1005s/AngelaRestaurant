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
  
  itemUpdate(ID){

      return function(e){
          var data = {
            type:'ItemUpdate',
            data:ID,
            form:{}
          };

          //获取表单数据
          ['Description','Name','Price','Status'].map((ele,i)=>{
            data.form[ele] = this.props[ele].value;
          });
          //发布
          store.dispatch(data);
      }
  }

  render() {
      var self = this;
      var { activeItem, itemList } = store.getState();
      var item = {};
      for(var i in itemList){
        if(activeItem == itemList[i].ID){
            item = itemList[i];
            break;
        }
      }
      
      if($.isEmptyObject(item))
        return null;

      return (
          <div className="manager-end-right" style={{ height: $(window).height() - 50 ,overflow:'auto'}}>
              <div className="manager-end-detail">
                    <form className="am-form am-form-horizontal">
                        <legend>基本信息</legend>
                        {
                            ['Description','Name','Price','Status'].map(function(ele,i){
                                return (
                                    <div className="am-form-group">    
                                        <label for="doc-ipt-3" className="am-u-sm-2 am-form-label">
                                            {translate[ele]}
                                        </label>
                                        <div className="am-u-sm-10">
                                        <input 
                                          type="text" 
                                          ref={ele} 
                                          placeholder={translate[ele]} 
                                          value={item[ele]} 
                                          onChange={(e)=>{
                                              item[ele] = e.target.value;
                                              store.dispatch({
                                                  type:'UpdateState'
                                              });
                                          }}
                                         />
                                        </div>
                                    </div>
                                );
                            })
                        }

                        <div className="am-form-group">
                            <img for="doc-ipt-pwd-2" className="am-u-sm-2 am-form-label" src={(item.Imgs[0]||{}).ImgUrl||""} alt={item.Name+"的图片"}/>
                            <div className="am-u-sm-10">
                            <input 
                              type="text" 
                              id="doc-ipt-pwd-2" 
                              placeholder="图片链接" 
                              value={(item.Imgs[0]||{}).ImgUrl||""} 
                              onChange={(e)=>{
                                  if(!item.Imgs[0])
                                    return ;
                                  item.Imgs[0].ImgUrl = e.target.value;
                                  store.dispatch({
                                    type:'UpdateState'
                                  });
                              }}
                             />
                            </div>
                        </div>

                        <div className="am-form-group">
                            <div className="am-u-sm-10 am-u-sm-offset-2">
                            <button 
                             type="submit" 
                             className="am-btn am-btn-primary"
                             onClick={this.itemUpdate(item.ID).bind(this)}
                            >确认更改</button>
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
