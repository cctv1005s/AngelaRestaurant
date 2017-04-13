import React,{Component} from 'react';

export default class Dish extends Component{
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
        var {ID,Img,Name,Description,Sales,Price} = this.props.Dish;
        var Ordered = this.props.Ordered;
        var count = Ordered.find(ID).Count;
        return (
            <div className="menu-item">
                <div className="item-img" >
                    <img src={Img}/>
                </div>
                <div className="item-info">
                    <div className="item-title">{Name}</div>
                    <div className="item-description">
                        <p>{Description}</p>
                        <p>月售：{Sales}</p>
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
            </div>
        );
    }
}