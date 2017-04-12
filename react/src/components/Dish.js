import React,{Component} from 'react';

export default class Dish extends Component{
    render(){
        var {Img,Name,Description,Sales,Price} = this.props.Dish;
        return (
            <div className="menu-item">
                <div className="item-img">
                    <img src={Img}/>
                </div>
                <div className="item-info">
                    <div className="item-title">{Name}</div>
                    <div className="item-description">
                        <p>{Description}</p>
                        <p>月售：{Sales}</p>
                    </div>
                    <div className="item-price">￥{Sales}</div>
                </div>
                <div className="item-op">
                    
                </div>
                <div className="item-hr"></div>
            </div>
        );
    }
}