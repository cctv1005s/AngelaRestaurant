export default function Ordered(){
    this.order = [];
}

Ordered.fn = Ordered.prototype;

/**
 * 往被点单的序列里面添加DishID
 */
Ordered.add = function(DishID){
    var found = this.find(DishID);
    if(!found){
        this.order.push({
            DishID:DishID,
            Count:1
        });
        return ;
    }
    found.Count ++;
}

/**
 * 减少
 */
Ordered.sub = function(DishID){
    var found = this.find(DishID);
    if(!found){
        console.error("队列里面找不到ID");
        return false;
    }
    if(find.Count == 0){
        console.error("队列里面已经没有他了");
        return false;
    }
    found.Count --;
}

/**
 * 根据ID搜索已经被点过的东西
 */
Ordered.find = function(DishID){
    for(var i in order){
        if(order[i].DishID == DishID){
            return order[i];
        }
    }
    return false;
}