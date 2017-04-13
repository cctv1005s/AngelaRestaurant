import React , {Component} from 'react';

export default class Footer extends Component{
    render(){
        var Ordered = this.props.Ordered;
        var order = Ordered.order;
        var count = 0;
        var money = 0;
        for(var i in order){
            count += order[i].Count;
            money += order[i].Count * order[i].Dish.Price;
        }
            
        return (
            <div className="footer">
                <div className="footer-all-price">￥{money}</div>
                <div className="footer-comfirm">
                    <button>确定</button>
                </div>
                <div className="footer-cart bounceIn">
                    <span className="shopping-cart"></span>
                    <div className="badge">
                        {count}                
                    </div>
                </div>
            </div>
        );
    }
}