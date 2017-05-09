import React from 'react';
import Tab from './Tab.js';

var style = {
  img:{

  },
  title:{

  },
  word:{

  },
  button: {
    border: '1px solid red',
    background: 'none',
    'font-size': '0.6rem',
    'width': '100px',
    'border-radius': '0.8rem',
    'padding': '0 10px'
  },
};

export default class RedTab extends Tab {
  renderBox() {
    return (
      <div>
        <div>
          <img src="/img/broom.png"/>
          <h3>清理中</h3>
          <p>XX号员工清理中</p>
        </div>
        <div>
          <button style={style.button}>开始</button>
        </div>
      </div>
    );
  }
}
