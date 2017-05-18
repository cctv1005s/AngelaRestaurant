import React , {Component} from 'react';
/**
 * 用于显示某一个类别的具体信息和操作
 */
export default class TypeList extends Component{
    rename(ID,className,decription){
        return function(e){
            var name = prompt('请输入新的类别名',className);
            if(name.trim().length == 0){
                alert("输入的新类别名不能为空");
                return ;
            }

            $.post('/api/v1/menu/type/update',{ID:ID,ClassName:name,ClassDescription:decription})
            .then((res)=>{
                if(res.success){
                    this.props.change(this.props.ele);
                }else{
                    alert(res.data);
                }
            });
        }
    }
    
    delete(ID){
        return function(e){
            var self = this;
            if(confirm("将删除该类别下的所有菜品，是否删除")){
                $.post('/api/v1/menu/type/delete',{ID:ID})
                .then(res =>{
                    this.props.change(this.props.ele);
                });
            }
        }
    }

    render(){
        var ele = this.props.ele;
        var active = this.props.active;
        return (
            <div className={`item ${active?'active':''}`}>
                <span className="item-name" >{ele.ClassName}</span>
                {
                    (()=>{
                        if(!this.props.active)
                            return null;
                        return (
                            <button 
                            className="item-setting-btn am-icon-gear" 
                            onClick={()=>{$(this.refs.setting).toggleClass('hidden')}}
                            >
                            </button>
                        )
                    })()
                }
                <div className="item-setting hidden" ref="setting">
                    <div className="rename" onClick={this.rename(ele.ID,ele.ClassName)}>修改名称</div>
                    <div className="delete" onClick={this.delete(ele.ID)}>删除</div>
                </div>
            </div>
        );
    }
    
}
