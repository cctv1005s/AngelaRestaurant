import React, { Component } from 'react';

/**
 * 用于显示经理管理界面的中间的界面
 */

var style = {
  item: {
    overflow: 'hidden',
    paddingTop: '10px',
  },
  imgBox: {
    width: '30%',
    float: 'left',
    marginLeft: '20px',
  },

  img: {
    width: '100%',
  },
  box: {
    float: 'left',
    marginLeft: '30px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  info: {
    color: 'grey',
    maxWidth: '150px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  active: {
    overflow: 'hidden',
    marginTop: '10px',
    borderLeft: '5px yellow solid',
  },
};

export default class List extends Component {
  itemAdd(){
    store.dispatch({type:'ItemAdd'});
  }

  render() {
    var { itemList, activeItem } = store.getState();
    return (
      <div className="manager-end-center">

        <div className="title" onClick={this.itemAdd}>
            <i className="am-icon-plus-circle" /> 
              添加
            </div>

        <div className="manager-end-list" style={{ height: `${$(window).height() - 70}px`, overflow: 'auto' }}>
            {
                    itemList.map((ele, i) => {
                      var itemStyle = ele.ID == activeItem ? style.active : style.item;
                      return (
                        <div
                          key={i}
                          className="item"
                          style={itemStyle}
                          onClick={() => {
                            store.dispatch({
                                type: 'ItemSelect',
                                data: ele.ID,
                              });
                          }}
                        >
                          <div style={style.imgBox}>
                            <img style={style.img} src={ele.Img} />
                          </div>

                          <div style={style.box}>
                            <div style={style.title}>{ele.Name}</div>
                            <p style={style.info}>{ele.Description}</p>
                          </div>
                        </div>
                      );
                    })
                }
          </div>
      </div>
    );
  }
}
