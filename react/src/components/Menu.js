import React , {Component} from 'react';
import Dish from './Dish.js';

//模拟数据BEGIN
var _classname = '热销,凉菜,热菜,排骨,汤,炸鸡,烤鸭,牛蛙';
var _onedish = {
    Img:"/img/dish.png",
    Name:"红烧牛肉面",
    Description:"非常好吃的红烧牛肉面",
    Sales:"180",
    Price:"18"
};

var _Dish = [];
var _classname = _classname.split(',');
var ClassName = [];
_classname.map(function(ele,i){
    ClassName.push({
        ID:i,
        Name:ele
    });
});

for(var i = 0;i < 100;i++){
    var t = Object.assign({},_onedish);
    t.ClassID = parseInt(Math.random() * ClassName.length);
    t.Name = t.Name + t.ClassID;
    _Dish.push(t);
}
//模拟数据END

export default class Menu extends Component{
    constructor(p){
        super(p);
        console.log(_Dish);
        this.state = {
            Dish:_Dish,
            ClassName:ClassName,
            Active:0
        };
    }

    render(){
        var self = this;
        var Active = self.state.Active;
        var ActiveClass = this.state.ClassName[Active];
        var ActiveClassID = ActiveClass.ID;
        console.log(ActiveClassID);
        return (
            <div className="menu">
                <div className="menu-left">
                {
                    this.state.ClassName.map(function(ele,i){
                        var _origin =  "menu-type";
                        return (
                            <div 
                             className={i == self.state.Active ? `${_origin} active`:`${_origin}`}
                             key={i}
                             onClick={()=>{
                                 self.setState({Active:i});
                             }}
                            >
                                {ele.Name}
                            </div>
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
                                return (
                                    <Dish Dish={ele}/>
                                );
                            })
                        }
                    </div>

                </div>
            </div>
        );
    }
}
