import React, { Component } from 'react';
export default class OrderedMenu extends Component {
  componentDidMount(){
    $.get('/api/v1/user/canOrder')
     .then(res => {
        if(res.success){
            return data.ID;
        }else{
            alert("请求失败，请刷新重试");
        }
     })
     .then(ID => {
        $.get()
     });
  }

  render() {
    return (
<div>
    <div className="ordered-list">
        <div className="ordered-item">
            <div className="img"><img src="http://img1.cache.netease.com/catchpic/A/A3/A3620DF6788FB30026E185BDD6D6182B.jpg" /></div>
            
            <div className="info">
                <h3 maxLength="10">红烧排骨</h3>
                <p maxLength="10">介绍</p>
                <p className="money">￥180</p>
            </div>

            <div className="ordered-cancel">
            <button>取消</button>
            </div>
        </div>
    </div>

    <div className="ordered-footer">
        <div>
        总计 <span>￥200</span>
        </div>
        <button>
        结账
        </button>
    </div>
</div>
    );
  }
}
