var statistic_model=require('../proxy/statistic');
var menu_model=require('../proxy/menu');
exports.getallhistorydish=function*(){
    try {
        var info=yield statistic_model.getallcookinglist();
        var counter={};
        for (var index in info) {
            if (info.hasOwnProperty(index)) {
                var element = info[index];
                //console.log(element);
                if (!counter[element['DishID']]) {
                    counter[element['DishID']]=1;
                }
                else{
                    counter[element['DishID']]++;
                }
                //counter[element['DishID']];
            }
            //console.log(counter);
       
        }

       
        var s=[];
        for (var key in counter) {
            if (counter.hasOwnProperty(key)) {
                var element = counter[key];
                var info=yield menu_model.oneDish(key);
                
                s.push([info[0].Name,element]);
            }
        }
        
        this.body={success:true,data:s};
    } catch (e) {
        this.body={success:false,data:e};
    }   
}