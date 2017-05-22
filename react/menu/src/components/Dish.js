import React,{Component} from 'react';
import DishShow from './DishShow.js';

/**
 * 该组件用于显示菜单中的一道菜
 */
export default class Dish extends Component{
    constructor(p){
        super(p);
        this.state = {
            Active:false
        };
    }

    onInc(){
        this.props.Ordered.add(this.props.Dish);
        this.setState({});
        this.props.onChange(this.props.Ordered);
    }

    onDec(){
        this.props.Ordered.sub(this.props.Dish);
        this.setState({});
        this.props.onChange(this.props.Ordered);
    }

    render(){
        var {ID,Img,Name,Description,Count,Price} = this.props.Dish;
        console.log(this.props.Dish);
        var Ordered = this.props.Ordered;
        var count = Ordered.find(ID).Count;
        return (
            <div className="menu-item">
                <div className="item-img" onClick={()=>{this.setState({Active:true})}}>
                    <img src={Img}/>
                </div>
                <div className="item-info">
                    <div className="item-title">{Name}</div>
                    <div className="item-description">
                        <p>{Description}</p>
                        <p>月售：{Count}</p>
                    </div>
                    <div className="item-price">￥{Price}</div>
                </div>
                <div className="item-op">
                    {
                        count > 0 ?(<div className="op-dec op" onClick={this.onDec.bind(this)}>-</div>):(<i></i>)
                    }
                    {
                        count > 0 ? (<div className="item-count">{count}</div>) : (<i></i>)
                    }
                    <div className="op-inc op" onClick={this.onInc.bind(this)}>+</div>
                </div>
                <div className="item-hr"></div>

                <DishShow 
                    Dish={this.props.Dish}
                    Active={this.state.Active}
                    onClick={()=>{this.setState({
                        Active:false
                    })}}
                />
            </div>
        );
    }
}