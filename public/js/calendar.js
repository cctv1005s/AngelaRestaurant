;(function($){
    var Calendar = function(calendar){   
        var today = new Date(); 
        //将最近4个月添加进来,对第二年的判定
        var num = 4;
        //i从1月开始增长，一直到12为止
        for(var i = today.getMonth()+1;i < today.getMonth()+1+num;i=i%13,i++)
        {
            //如果月份大于12的话，对小与num的月份进行加年处理，但是这样会有一个问题，也就是num最好
            // 不要超过6，超过6就会引起问题
            if(today.getMonth()+1+num>12){
                if(i<=num)
                this.addMonth(calendar,i,today.getFullYear()+1);
            }
            else{//在一年之内
                this.addMonth(calendar,i,today.getFullYear());
            }
        }
        //初始化界面
        this.initMonth(calendar);

        //创建监听
        this.clickListener(calendar);
    };
   
    //原生函数
    Calendar.prototype = {

    //第一个参数是一个jQuery对象，第二个参数是要添加的月份
    addMonth:function(calendar,month,year){
        
        var date =calendar.find('.date');
        //获取今日的日期
        var today = new Date();
        this.calendar = calendar;

        var monthDay = [31,29,31,30,
                        31,30,31,31,
                        30,31,30,31];
        
        //获取这个月的第一天对应的是星期几
        today.setFullYear(year);
        today.setMonth(month-1);
        today.setDate(1);
        //获取周几
        var someday = today.getDay();
        var day = '<ul class="day clearfix" data-month='+(today.getMonth()+1)+'>';

        for(var i = 0;i < someday;i++){
            day+="<li>&nbsp;</li>";
        }

        //根据是第几个月循环天数
        for(var i = 0;i<monthDay[today.getMonth()];i++){
            day+="<li data-month="+(today.getMonth()+1)+" data-day="+(i+1)+" data-year="+today.getFullYear()+" >"+(i+1)+"</li>";
        }
        
        var year_month = '<div class="year-month"><h3>' +today.getFullYear()+"年"+(today.getMonth()+1)+"月</h3></div>"; 
        //结尾
        day += "</ul>";   
        date.append(year_month)             
        date.append(day);
        },
    //为了实现不可点击效果而初始化的
    initMonth:function(calendar){
        var today = new Date();
        //实现不可点击效果
        var day = calendar.find('.day');
        //存储这个月的jQuery对象
        var theMonth;
        
        day.each(function(index, el) {
            if($(el).attr('data-month') == today.getMonth()+1){
              theMonth = $(el);  
            } 
        });
        //遍历theMonth下面所有的li
        var theday = today.getDate();
        
        theMonth.find("li").each(function(index, el) {
                if($(el).attr('data-day') < theday){
                    $(el).addClass('disable')
                }
                if($(el).attr('data-day') == theday){
                    $(el).wrapInner('<p></p>');
                    $(el).addClass('active');
                }
        });
    },

    clickListener:function(calendar){
        //创建点击监听
        var date_li = calendar.find('.date li');
        var self = this;
        date_li.click(function(event) {
            /* Act on the event */
        //disable的项目不能响应
        if($(event.target).attr('class')!="disable"){
        //找到active然后取出它里面的文字，接着保存文字，最后删掉它里面的p
        calendar.find('.active').html(calendar.find('.active p').text());
        calendar.find('.active').removeClass('active');
        //在里面加载active    
        $(event.target).addClass('active');
        $(event.target).wrapInner('<p></p>')
        self.hideCalendar();
        //改变time的值
        var date = self.getDate();
        var week = new Date();
        week.setYear(date.year);
        week.setMonth(date.month-1);
        week.setDate(date.day);
        
        self.time.text(date.year+"-"+date.month+"-"+date.day+" 周"+self.weekName[week.getDay()]+" ▼"); 
        }}
        );
        //对于返回键的监听
        $("#calendar_back").click(function(event) {
            self.hideCalendar();
        });

    },
    showCalendar:function(){
        this.calendar.slideDown('slow', function() {
        });
        
        this.calendar.css({
                position:'absolute',
                left:0,
                top:0
            });
    },
    hideCalendar:function(){
        this.calendar.slideUp('slow', function() {
            });
    },
    
    getDate:function(){
        var activeItem = this.calendar.find('.active');
        var date ={
            month:activeItem.attr('data-month'),
            day:activeItem.attr('data-day'),
            year:activeItem.attr('data-year')
        };
        return date;
    },
    addTime:function(time){
        var self = this;
        time.click(function(event) {
            self.time =$(event.target);
            self.showCalendar();
        });
    },
    weekName:['日','一','二','三','四','五','六']
    ,
    };

    window["Calendar"] = Calendar;
})(jQuery);

