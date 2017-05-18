import React, { Component } from 'react';
import Type from './Type.js';

/**
 * 用于显示经理管理界面的侧边栏
 */

export default class TypeList extends Component {
  constructor(p) {
    super(p);
    this.state = {
        type: [],
        active: -1,
      };
  }

  componentDidMount() {
    var self = this;
    $.get('/api/v1/menu/type')
         .then((res) => {
           if (res.success)
             this.setState({ type: res.data,active: res.data[0].ID });
           self.props.change(res.data[0]);
         });
  }

  render() {
    return (
        <div className="manager-end-left" style={{ height: $(window).height() - 50 }}>
            <div className="title">
                + 新建类别
            </div>
            <div className="manager-end-add hidden">
            <input type="text" />
            <button>提交</button>
            <button>取消</button>
          </div>
            <div className="manager-end-type">
            {
                this.state.type.map((ele, i) => (
                    <Type
                            ele={ele}
                            key={i}
                            change={this.props.change.bind(this)}
                            active={ele.ID == this.state.active ? true:false}
                        />
                ))
             }
          </div>
          </div>
      );
  }
}
