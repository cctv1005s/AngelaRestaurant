var statistic_model=require('../proxy/statistic');
var menu_model=require('../proxy/menu');
var timepro=require('../tools/time');
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
              
            }
       
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
exports.getdishwithcolum=function*(){
    try {
        var info=yield statistic_model.getallcookinglist();
        var counter={};
        for (var index in info) {
            if (info.hasOwnProperty(index)) {
                var element = info[index];
                
                var id=element.Name;
                var day=element.OrderTime;

          
                var date=new Date(day);
                var index=timepro.gettoday(date);
                if(!counter[id]){
                    counter[id]=[0,0,0];
                }
                counter[id][index]++;
            }
        }
        res=[]
        for (var key in counter){
            res.push({name:key,data:counter[key]})
        }
        
        this.body={success:true,data:res};
    } catch (e) {
        this.body={success:false,data:e};
    }
}
