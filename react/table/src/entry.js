
'use strict';

//引入组件
import './components/App.js';
var width = $(window).width() / 10;
$('html').css({
  "font-size": width > 50 ? 50 : width 
});