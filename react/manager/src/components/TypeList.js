import React , {Component} from 'react';
import Type from './Type.js';

/**
 * 用于显示经理管理界面的侧边栏
 */

export default class TypeList extends Component{
    render(){
        return (
        <div className="manager-end-left" style={{height:$(window).height() - 50}}>
            <div className="title">
                + 新建类别
            </div>
            <div className="manager-end-add hidden">
                <input type="text"/>
                <button>提交</button>
                <button>取消</button>
            </div>
            <div className="manager-end-type">
                <Type />
            </div>
        </div>
        );
    }
}