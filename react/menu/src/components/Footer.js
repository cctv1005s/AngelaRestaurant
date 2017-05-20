import React, { Component } from 'react';
import FooterShow from './FooterShow.js';

export default class Footer extends Component {
  constructor(p) {
    super(p);
    this.state = {
      Active: false,
    };
  }

  /**
   * 提交菜品到厨房
   */
  pushOrder() {
    var { order } = this.props.Ordered;
    var data = {};
    var list = [];
    var pathname = location.pathname;
    var reg = pathname.match(/\/menu\/(.*)/); 
    var id = reg[0];
    order.map(function(ele){
    list.push({
        DishID:ele.Dish.ID,
        Count: ele.Count 
    });
    });
    //添加数据
    data.DishIDList = list;
    $.post(`/api/v1/order/${id}/add`,data)
    .then((res)=>{
        if(res.success){
          this.props.Ordered.clearAll();
          alert("订餐成功");
        }
    });
  }

  render() {
    var Ordered = this.props.Ordered;
    var order = Ordered.order;
    var Active = this.state.Active;
    var count = 0;
    var money = 0;

    for (var i in order) {
      count += order[i].Count;
      money += order[i].Count * order[i].Dish.Price;
    }

    return (
      <div className="footer">
          <FooterShow
              Ordered={Ordered}
              Active={this.state.Active}
              onClick={() => { this.setState({ Active: false }); }}
            />

          <div className="footer-all-price" onClick={() => this.setState({ Active: !Active })} >￥{money}</div>

          <div className="footer-comfirm">
              <button onClick={this.pushOrder.bind(this)}>确定</button>
            </div>

          <div className="footer-cart" onClick={() => this.setState({ Active: !Active })}>
              <span className="shopping-cart" />
              <div className="badge">
                  {count}
                </div>
            </div>
        </div>
    );
  }
}
