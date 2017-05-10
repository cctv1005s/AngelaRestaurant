export default class Ordered{
    constructor(){
        this.order = [];
    }

    add(Dish){
        var DishID = Dish.ID;
        var found = this.find(DishID);
        if(!found){
            this.order.push({
                DishID:DishID,
                Count:1,
                Dish:Dish
            });
            return ;
        }
        found.Count ++;
        window.___render();
    }

    sub(Dish){
        var DishID = Dish.ID;
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
        window.___render();
    }

    find(DishID){
        var order = this.order;
        for(var i in order){
            if(order[i].DishID == DishID){
                return order[i];
            }
        }
        return false;
    }

    clearAll(){
        this.order = [];
        window.___render();
    }
}