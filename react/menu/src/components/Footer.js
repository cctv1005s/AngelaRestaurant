import React , {Component} from 'react';
import FooterShow from './FooterShow.js';

export default class Footer extends Component{
    constructor(p){
        super(p);
        this.state = {
            Active:false
        };
    }
    render(){
        var Ordered = this.props.Ordered;
        var order = Ordered.order;
        var Active = this.state.Active;
        var count = 0;
        var money = 0;
        for(var i in order){
            count += order[i].Count;
            money += order[i].Count * order[i].Dish.Price;
        }

        return (
            <div className="footer">
                <FooterShow 
                 Ordered = {Ordered}
                 Active = {this.state.Active}
                 onClick = {()=>{this.setState({Active:false})}}
                />
                
                <div className="footer-all-price" onClick={()=>this.setState({Active:!Active})} >￥{money}</div>
                
                <div className="footer-comfirm">
                    <button>确定</button>
                </div>

                <div className="footer-cart" onClick={()=>this.setState({Active:!Active})}>
                    <span className="shopping-cart"></span>
                    <div className="badge">
                        {count}                
                    </div>
                </div>
            </div>
        );
    }
}