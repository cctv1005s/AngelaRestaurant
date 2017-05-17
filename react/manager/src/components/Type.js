import React , {Component} from 'react';
/**
 * 用于显示某一个类别的具体信息和操作
 */

export default class TypeList extends Component{
    render(){
        return (
            <div className="item">
                <span className="item-name">炒菜</span>
                <button className="item-setting-btn am-icon-gear"></button>
                <div className="item-setting">
                    <div className="rename">修改名称</div>
                    <div className="delete">删除</div>
                </div>
            </div>
        );
    }
}