import React,{Component} from 'react';

export default class FooterShow extends Component{
    render(){
        if(!this.props.Active)
            return (<i></i>)

        return (
            <div 
             className="footer-show" 
             style={{height:$(window).height() - 50}} 
             onClick={this.props.onClick}
             >
                <div className="footer-pane">
                    <div className="footer-info">已点菜单</div>

                    <div className="footer-list">
                        
                        <div className="footer-item">
                            <div className="left">红烧牛肉面</div>
                            <div className="footer-op right" >
                                <div className="footer-dec left">-</div>
                                <div className="footer-count left">1</div>
                                <div className="footer-inc left ">+</div>
                            </div>
                        </div>

                        <div className="footer-item">
                            <div className="left">红烧牛肉面</div>
                            <div className="footer-op right" >
                                <div className="footer-dec left">-</div>
                                <div className="footer-count left">1</div>
                                <div className="footer-inc left ">+</div>
                            </div>
                        </div>

                        <div className="footer-item">
                            <div className="left">红烧牛肉面</div>
                            <div className="footer-op right" >
                                <div className="footer-dec left">-</div>
                                <div className="footer-count left">1</div>
                                <div className="footer-inc left ">+</div>
                            </div>
                        </div>                        

                    </div>

                </div>
            </div>
        )
    }
}