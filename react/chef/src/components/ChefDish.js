/**
 * 用于显示厨师看到的每一个菜的界面
 */
import React , {Component} from 'react';

export default class ChefDish extends Component{
    render(){
        var {Img , Price ,Name ,Status,Description } = this.props.Dish;
        return (
            <div className="chefdish">
                <div className="chefdish-img">
                    <img  src={Img}/>
                </div>
                <div className="chefdish-info">
                    <div className="chefdish-title">红烧排骨</div>
                    <div className="chefdish-description">
                        {Description}
                    </div>
                    
                    <div>
                        <div className="chefdish-price">￥{Price}</div>
                        <div className="chefdish-state">
                            <span ></span>
                            <span ></span>
                        </div>
                    </div>
                </div>
                <div className="chefdish-op">
                    <button onClick={}>确认</button>
                    <button onClick={}>取消</button>
                </div>
            </div>
        );
    }
}