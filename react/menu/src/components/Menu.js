import React , {Component} from 'react';
import Dish from './Dish.js';
import Ordered from './Ordered.js';
import MenuType from './MenuType.js';

export default class Menu extends Component{
    constructor(p){
        super(p);
        var o = new Ordered();
        this.state = {
            Dish:[],//菜单名
            ClassName:[],//类别名
            Active:0,//
            Ordered:o//所有Dish持有一份订单表
        };
    }

    componentDidMount(){
        var self = this;
        //获取所有的菜的类别
        //获取所有的菜
        $.get('/api/v1/menu/type')
        .then(function(body){
            if(!body.success)
                throw new Error("获取菜品失败，请联系管理员");
            var classnames = body.data;
            for(var i in classnames)
                classnames[i].Name = classnames[i].ClassName;
            self.setState({ClassName:classnames});
            return classnames;
        })
        .then(this.getDishs.bind(this))
        .catch(function(e){
            alert(e);
        });
    }

    getDishs(classnames){
        var self = this;
        console.log(this);
        classnames.map(function(ele,i){
            $.get(`/api/v1/menu/type/${ele.ID}`)
            .then(function(body){
                if(!body.success)
                    throw new Error(`获取第${ele.ID}菜品出现问题`);
                var data = body.data;
                for(var i in data)
                    data[i].Img = (data[i].Imgs[0]||{}).ImgUrl;                

                var Dish = self.state.Dish;
                Dish = Dish.concat(data);
                self.setState({Dish:Dish});
            })
            .catch(function(e){
                alert(e);
            });
        });
    }

    render(){
        var self = this;
        var Active = self.state.Active;
        var ActiveClass = this.state.ClassName[Active]||{};
        var ActiveClassID = ActiveClass.ID;
        return (
            <div className="menu">
            
                <div className="menu-left">
                {
                    this.state.ClassName.map(function(ele,i){
                        return (
                            <MenuType
                                Ele = {ele}
                                Ordered = {self.state.Ordered}
                                Active = {i == self.state.Active}
                                onClick = {()=>{self.setState({Active:i})}}
                            />
                        )
                    })
                }
                </div>
                
                <div className="menu-right">
                    <div className="menu-title">{ActiveClass.Name}</div>
                    <div className="menu-list" style={{height:$(window).height() - 120}}> 
                        {
                            this.state.Dish.map(function(ele,i){
                                if(ele.ClassID != ActiveClassID)
                                    return ;
                                if(ele.Status === 'Unavaliable')
                                    return ;
                                return (
                                    <Dish 
                                     Dish={ele}
                                     Ordered = {self.state.Ordered}
                                     //改变菜单的操作，再往上传
                                     onChange={function(a){self.props.onChange(a);self.setState({});}}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
