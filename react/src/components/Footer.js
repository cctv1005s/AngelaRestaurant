import React , {Component} from 'react';

export default class Footer extends Component{
    render(){
        return (
            <div className="footer">
                <div className="footer-all-price">￥200</div>
                <div className="footer-comfirm">
                    <button>确定</button>
                </div>
                <div className="footer-cart">
                    <span className="shopping-cart"></span>
                    <div className="badge">1</div>
                </div>
            </div>
        );
    }
}