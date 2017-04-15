import React,{Component} from 'react';
export default function({Active,Ordered,onClick,Ele}){
    var _origin =  "menu-type";
    var {order} = Ordered;//拿到所有的点菜单
    var count = 0 ;
    for(var i in order){
        var Dish = order[i].Dish;
        if(Dish.ClassID == Ele.ID){
            count += order[i].Count;
        }
    }

    return (
        <div 
         className={Active?`${_origin} active`:`${_origin}`}
         key={Ele.ID}
         onClick={onClick}
        >
            {Ele.Name}
            {
                count > 0 ?(<div className="menu-type-count">{count}</div>):(<i></i>)
            }
        </div>
    );
}