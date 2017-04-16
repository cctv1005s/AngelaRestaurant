/**
 * 用于显示厨师看到的每一个菜的界面
 */

import React , {Component} from 'react';

export default class ChefDish extends Component{
    
    render(){
        var {Img , Price ,Name ,State } = this.props.Dish;
        return (
            <div className="chefdish">
                <div className="chefdish-img">
                    <img  src={Img}/>
                </div>
                <div className="chefdish-info">
                    <div className="chefdish-title">红烧排骨</div>
                    <div className="chefdish-description">
                        非常好吃的红烧排骨
                    </div>
                    
                    <div>
                        <div className="chefdish-price">￥18</div>
                        <div className="chefdish-state">
                            <span ></span>
                            <span ></span>
                        </div>
                    </div>
                </div>
                <div className="chefdish-op">
                    <button>确认</button>
                    <button>取消</button>
                </div>
            </div>
        );
    }
}