import React from 'react';
import Tab from './Tab.js';

var style = {
  img: {
    height: '2rem',
  },
  title: {
    'font-size': '1rem',
    margin: '0',
    color: 'red',
  },
  word: {
    'font-size': '.5rem',
    margin: 0,
  },
  button: {
    border: '1px solid green',
    background: 'none',
    'font-size': '0.5rem',
    width: '150px',
    'border-radius': '0.8rem',
    padding: '0 10px',
  },
};

export default class RedTab extends Tab {
  clearTable(ID){
    return function(e){
      $.post('/api/v1/table/cleanup',{TableID:ID})
       .then(res =>{
          if(res.success){
            alert("更新成功");
            this.props.onEnd();
          }else{
            alert(data);
          }
       });
    }
  }

  renderBox() {
    var {ID} = this.props;
    var ele = this.props.ele;
    return (
      <div>
        <div>
          <img src="/img/icon/broom.png"  style={style.img}/>
          <h3 style={style.title}>清理中</h3>
          <p style={style.word}>{ele.EmployeeID}号员工清理中</p>
        </div>
        <div>
          <button style={style.button} onClick={this.clearTable(ID)}>
            清理结束
          </button>
        </div>
      </div>
    );
  }
}
