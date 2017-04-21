var $header_l =  $(".header-left"),
    $header_r = $(".header-right"),
    $tips = $("#tips"),
    $call = $("#call"),
    $ordered = $("#ordered");

$header_l.click(function(e){
    window.history.go(-1);
});

$header_r.click(function(e){
    $tips.toggleClass("hidden");
});

$call.click(function(e){
    alert("您的催单请求已经收到，请稍后");
});

$ordered.click(function(e){
    var path = window.location.origin + window.location.pathname;
    window.location.href = path + '#/ordered';
});



