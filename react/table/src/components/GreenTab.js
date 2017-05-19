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
    width: '100px',
    'border-radius': '0.8rem',
    padding: '0 10px',
  },
};

export default class GreenTab extends Tab {
  bindTable() {
    $.post(
      `/api/v1/table/${this.props.ID}/bind`,
      {
        AccessToken: this.refs.input.value,
        PeopleNum: this.refs.num.value,
      },
    ).then((res)=>{
      if(res.success)
        alert('绑定成功');
      else{
        alert('绑定失败');
      }
      this.props.onEnd();
    });
  }

  renderBox() {
    return (
      <div>
        <div style={style.header}>用户用餐绑定</div>
        <div>
          <div style={style.title}>TOKENID:</div>
          <input style={style.input} maxLength="12" ref="input" />
          <div style={style.title}>人数:</div>
          <input style={style.input} maxLength="12" ref="num" />
        </div>
        <div>
          <button style={style.button} onClick={this.bindTable.bind(this)}>开始</button>
        </div>
      </div>
    );
  }
}
