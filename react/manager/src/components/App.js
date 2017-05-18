'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Index from './Index.js';
import StaffIndex from './StaffIndex.js';
var Redux = require('redux');
import reducer from './reducer.js';
const store = Redux.createStore(reducer);
global.store = store;

//最终渲染
var render = function(){
    ReactDom.render((
        <Router history={hashHistory}>
            <Route path='/' component={Index}></Route>
            <Route path='/staff' component={StaffIndex}></Route>
        </Router>
    ), document.getElementById('app'));
}

render();
store.subscribe(render);
