import React, { Component } from 'react';

export default class AnaDetail extends Component {
  render() {
      var { activeItem, itemList } = store.getState();
      var item = {};
      itemList.map(ele =>{
        if(ele.ID == activeItem)
          item = ele;
      });

      return (
          <div className="manager-end-right" style={{ height: $(window).height() - 50 ,overflow:'auto'}}>
            <iframe src={item.Href} style={{height:'100%',width:'100%'}}></iframe>
          </div>
        );
    }
}
