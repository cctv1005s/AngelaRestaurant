import React, { Component } from 'react';
import GreenTab from './GreenTab.js';
import RedTab from './RedTab.js';

var getStyle = function (color) {
  var colorTable = {
    GREEN: 'rgb(107,255,84)',
    RED: 'rgb(255,37,37)',
    YELLOW: 'rgb(255,236,91)',
  };
  return {
    warpper: {
      textAlign: 'center',
      width: '3.5rem',
      float: 'left',
      margin: '10px 20px',
    },
    table: {
      border: `6px solid ${colorTable[color]}`,
      'border-radius': '100%',
      height: '3.5rem',
      width: '3.5rem',
      'line-height': '3.5rem',
      'text-align': 'center',
      fontSize: '.5rem',
      color: colorTable[color],
    },
    text: {
      'font-size': '.5rem',
      color: colorTable[color],
    },
  };
};

var Status = {
  GREEN: '空闲',
  RED: '清理中',
  YELLOW: '用餐中',
};

export default class Table extends Component {
  constructor(p) {
    super(p);
    this.state = {
      tabVisible: false,
    };
  }

  renderTab() {
    var ele = this.props.ele || {};// 防止爆炸，加入默认值
    var Status = ele.Status;
    var Tabs = {
      RED: <RedTab
        ID={ele.ID}
        visible={this.state.tabVisible}
        onEnd={(e) => { this.setState({ tabVisible: false }); }}
      />,
      GREEN: <GreenTab
        ID={ele.ID}
        visible={this.state.tabVisible}
        onEnd={(e) => { this.setState({ tabVisible: false }); }}
      />,
    };
    return Tabs[Status];
  }

  render() {
    var ele = this.props.ele;
    var style = getStyle(ele.Status || 'GREEN');
    return (
      <div style={style.warpper}>
        <div style={style.table} onClick={() => { this.setState({ tabVisible: true }); }}>
          {Status[ele.Status]}
        </div>
        <div style={style.text}> {ele.ID}号桌 </div>
        {this.renderTab()}
      </div>
    );
  }
}
