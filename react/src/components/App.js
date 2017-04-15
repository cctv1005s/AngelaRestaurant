'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Index from './Index.js'
import OrderedMenu from './OrderedMenu.js';

//最终渲染
ReactDom.render((
    <Router history={hashHistory}>
        <Route path='/' component={Index}></Route>
        <Route path='/ordered' component={OrderedMenu}></Route>
    </Router>
), document.getElementById('app'));
