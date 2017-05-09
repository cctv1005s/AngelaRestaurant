import React from 'react';
import Tab from './Tab.js';

var style = {
  header: {
    'font-size': '.7rem',
  },
  title: {
    'font-size': '.5rem',
    'text-align': 'left',
  },
  input: {    
    border: 'none',
    'border-bottom': '1px solid grey',
    outline: 'none',
    padding: '0 10px',
    'text-align': 'center',
    overflow: 'hidden',
    width: '100%',
    'font-size': '1rem',
  },
  button: {
    border: '1px solid green',
    background: 'none',
    'font-size': '0.6rem',
    'width': '100px',
    'border-radius': '0.8rem',
    'padding': '0 10px'
  },
};

export default class GreenTab extends Tab {
  renderBox() {
    return (
    <div>
      <div style={style.header}>用户用餐绑定</div>
      <div>
        <div style={style.title}>TOKENID:</div>
        <input style={style.input} maxLength="12" />
      </div>
      <div>
        <button style={style.button}>开始</button>
      </div>
    </div>);
  }
}
