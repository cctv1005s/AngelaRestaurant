import React, { Component } from 'react';
import ChefDish from './ChefDish.js';

export default class Index extends Component {
  constructor(p) {
      super(p);
      this.state = {
          Dish: [],
        };
    }

  componentDidMount(){
    $.get(`/api/v1/chef/1/order`)
        .then(res =>{
          if(!res.success)
            alert('获取数据失败' + res.data);
          this.setState({
            Dish:res.data
          });
        });
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
                          if (ele.Status != 'WAIT')
                              {return null;}
                          return (
                              <ChefDish
                                  Dish={ele}
                                  onEnd={()=>{
                                      this.componentDidMount();
                                  }}
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
                          if (ele.Status != 'COOKING')
                              {return null;}
                          return (
                              <ChefDish
                                  Dish= {ele}
                                  onEnd={()=>{
                                      this.componentDidMount();
                                  }}
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
