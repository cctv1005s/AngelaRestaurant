import React , {Component} from 'react';

/**
 * 用于显示经理管理界面的中间的界面
 */
export default class Detail extends Component{
    render(){
        var {itemList} = store.getState();
        return (
            <div className="manager-end-right">
                <div className="manager-end-detail">
                    
                </div>
            </div>
        );
    }
}