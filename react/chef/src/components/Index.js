import React, { Component } from 'react';
import ChefDish from './ChefDish.js';

// 生成模拟数据
let _onedish = {
  Img: '/img/dish.png',
  Name: '红烧牛肉面',
  Description: '非常好吃的红烧牛肉面',
  Sales: '180',
  Price: '18',
};

let Dishs = [];
let state = ['ready', 'working', 'finish'];
for (let i = 0; i < 100; i++) {
  let t = Object.assign({}, _onedish);
  t.State = state[parseInt(Math.random() * 3)];
  t.ID = i;
  Dishs.push(t);
}

export default class Index extends Component {
  constructor(p) {
      super(p);
      this.state = {
          Dish: Dishs,
        };
    }

  render() {
      return (
          <div className="chef-end">
              <div className="chef-end-left" >
                  <div className="chef-end-title">
                      <i className="am-icon-clock-o" />
                        待确认
                    </div>
                  <div className="chef-end-wrapper" style={{ height: $(window).height() - 100 }}>
                      {
                        this.state.Dish.map((ele) =>  {
                          if (ele.State != 'ready')
                              {return null;}
                          return (
                              <ChefDish
                                  Dish ={ele}
                                />
                            );
                        })
                    }
                    </div>
                </div>

              <div className="chef-end-right">
                  <div className="chef-end-title">
                      <i className="am-icon-check-square-o" />
                        已确认
                    </div>
                  <div className="chef-end-wrapper" style={{ height: $(window).height() - 100 }}>
                      {
                        this.state.Dish.map((ele) =>  {
                          if (ele.State != 'working')
                              {return null;}
                          return (
                              <ChefDish
                                  Dish= {ele}
                                />
                            );
                        })
                    }
                    </div>
                </div>

            </div>
        );
    }
}
