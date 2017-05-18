import React, { Component } from 'react';

export default class FooterShow extends Component {
  onAdd(Dish) {
      this.props.Ordered.add(Dish);
      this.setState({});
    }

  onSub(Dish) {
      this.props.Ordered.sub(Dish);
      this.setState({});
    }

  render() {
      var self = this;
        // 已经点了的菜的详情
      var { order } = this.props.Ordered;

      if (!this.props.Active)
          return null;
      return (
          <div
              className="footer-show"
              style={{ height: $(window).height() - 50 }}
              onClick={this.props.onClick}
            >
              <div className="footer-pane">
                  <div className="footer-info">已点菜单</div>

                  <div className="footer-list">
                      {
                            (order||[]).map((ele,i) =>  {
                              if(ele.Count == 0)
                                return null;
                              return (
                                  <div className="footer-item" key={i}>
                                      <div className="left">{ele.Dish.Name}</div>
                                      <div className="footer-op right" >
                                          <div className="footer-dec left" onClick={(e) => { e.stopPropagation(); self.onSub(ele.Dish) ;}}>-</div>
                                          <div className="footer-count left">{ele.Count}</div>
                                          <div className="footer-inc left " onClick={(e) => { e.stopPropagation(); self.onAdd(ele.Dish); }}>+</div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
