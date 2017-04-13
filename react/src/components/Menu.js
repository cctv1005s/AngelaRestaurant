import React , {Component} from 'react';
import Dish from './Dish.js';
import Ordered from './Ordered.js';
import MenuType from './MenuType.js';
import DishShow from './DishShow.js';

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
    t.ID = i;
    _Dish.push(t);
}
//模拟数据END

export default class Menu extends Component{
    constructor(p){
        super(p);
        var o = new Ordered();
        this.state = {
            Dish:_Dish,//菜单名
            ClassName:ClassName,//类别名
            Active:0,//
            Ordered:o,//所有Dish持有一份订单表
            ActiveDish:{},
            ActiveDishFlag:false
        };
    }

    render(){
        var self = this;
        var Active = self.state.Active;
        var ActiveClass = this.state.ClassName[Active];
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
                                return (
                                    <Dish 
                                     Dish={ele}
                                     Ordered = {self.state.Ordered}
                                     onChange={function(a){self.props.onChange(a);self.setState({});}}
                                     onShow={()=>{
                                         self.setState({
                                            ActiveDishFlag:true,
                                            ActiveDish:ele 
                                         });
                                     }}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
                
                <DishShow 
                    Dish={this.state.ActiveDish}
                    Active={this.state.ActiveDishFlag}
                    onClick={()=>{this.setState({
                        ActiveDishFlag:false
                    })}}
                />
            </div>
        );
    }
}
