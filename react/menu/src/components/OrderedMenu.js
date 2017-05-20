import React, { Component } from 'react';
export default class OrderedMenu extends Component {
  constructor(p){
      super(p);
      this.state={
          orderedDish:[]
      };
  }

  componentDidMount(){
    var self = this;
    var pathname = location.pathname;
    var reg = pathname.match(/\/menu\/(.*)/); 
    var id = reg[1];
    this.OrderID = id;
    $.get(`/api/v1/order/${id}/dish`)
     .then((res)=>{
        if(res.success)
            self.setState({orderedDish:res.data});
        else
            alert("请求失败，请刷新重试");
    });
  }

  cancelDish(ID){
    var self = this;
    return function(e){
        $.post(`/api/v1/order/${self.OrderID}/sub`,{CookingID:ID})
         .then((res)=>{
            if(res.success){
                 if(confirm("确定要取消这道菜吗？")){
                    alert("取消成功");
                    self.componentDidMount();
                    self.setState({});
                 }
            }else{
                alert(res.data);
            }
         });
    }
  }

  checkOut(e){
    $.post(`/api/v1/order/${this.OrderID}/pay`)
     .then(res =>{
         if(!res.success)
            alert(res.data);
         else{
            window.location.href = "/table";
         }
     });
  }
  
  render() {
    var self = this;
    this.allCount = 0;
    return (
        <div>
            <div className="ordered-list" style={{height:($(window).height() - 100)+'px'}}>
                {
                this.state.orderedDish.map((ele,i)=>{
                    if(ele.Status !== 'CANCEL')
                        this.allCount += ele.Price;
                    return (
                    <div className="ordered-item">
                        <div className="img"><img src="http://img1.cache.netease.com/catchpic/A/A3/A3620DF6788FB30026E185BDD6D6182B.jpg" /></div>
                        <div className="info">
                            <h3 maxLength="10">{ele.Name}</h3>
                            <p maxLength="10">{ele.Description}</p>
                            <p className="money">￥{ele.Price}</p>
                            <span className="serial">流水号：{ele.ID}</span>
                        </div>
                        <div className="ordered-cancel ">
                            {
                                (function(){
                                    switch(ele.Status){
                                        case 'WAIT':
                                            return (<button className="am-btn-danger" onClick={self.cancelDish(ele.ID)}>取消</button>);
                                        case 'COOKING':
                                            return (<button className="am-btn-default" disabled="disabled">制作中</button>);
                                        case 'CANCEL':
                                            return (<button className="am-btn-default" disabled="disabled">已取消</button>);
                                        default:
                                            return (<button className="am-btn-default" disabled="disabled">未知状态</button>);
                                    }
                                })()
                            }
                        </div>
                    </div>
                    );
                })
                }
            </div>

            <div className="ordered-footer">
                <div>
                总计 <span>￥{this.allCount}</span>
                </div>
                <button onClick={self.checkOut.bind(this)}>
                结账
                </button>
            </div>
        </div>
    );
  }
}
