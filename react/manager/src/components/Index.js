import React , {Component} from 'react';
import ChefDish from './ChefDish.js'

//生成模拟数据

export default class Index extends Component{
    constructor(p){
        super(p);
    }

    render(){
        return (
            <div className="manager-end">
                <div className="manager-end-lef">
                    <div className="title">
                        + 新建类别
                    </div>
                    <div className="manager-end-type">
                        <div className="item">
                            炒菜
                        </div>
                    </div>
                </div>
                
                <div className="manager-end-center">
                    
                    <div className="title">
                        + 添加菜品
                    </div>
                    
                    <div className="manager-end-list">
                        
                        <div className="item">

                        </div>
                        
                    </div>

                </div>
                
                <div className="manager-end-right">
                    <div className="manager-end-detail">

                    </div>
                </div>
            </div>
        )
    }
}