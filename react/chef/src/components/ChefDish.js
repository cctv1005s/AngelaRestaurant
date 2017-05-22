/**
 * 用于显示厨师看到的每一个菜的界面
 */
import React , {Component} from 'react';

export default class ChefDish extends Component{
    comfirm(){
        var {ID,Status} = this.props.Dish;
        if(Status == 'WAIT'){
            $.post(`/api/v1/chef/1/confirm/${ID}`)
            .then(res=>{
                if(!res.success)
                    alert('操作失败,请重试');
            });
        }else if(Status == 'COOKING'){
            $.post(`/api/v1/chef/1/finish/${ID}`)
             .then(res =>{
                if(!res.success)
                    alert('操作失败,请重试');                 
             })
        }
        this.props.onEnd();
    }

    cancel(){
        var {ID,Status} = this.props.Dish;
        $.post(`/api/v1/chef/1/cancel/${ID}`)
         .then(res=>{
            if(res.success)
                alert('取消成功');
            else{
                alert('取消失败'+res.data );
            }
         });
         this.props.onEnd();
    }

    render(){
        var {Img , Price ,Name ,Status,Description } = this.props.Dish;
        return (
            <div className="chefdish">
                <div className="chefdish-img">
                    <img  src={Img[0].ImgUrl}/>
                </div>
                <div className="chefdish-info">
                    <div className="chefdish-title">{Name}</div>
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
                    <button onClick={this.comfirm.bind(this)}>确认</button>
                    <button onClick={this.cancel.bind(this)}>取消</button>
                </div>
            </div>
        );
    }
}