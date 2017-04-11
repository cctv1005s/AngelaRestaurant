'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

class App extends React.Component{
    render(){
        return (你好呀);
    }
}

//最终渲染
ReactDom.render((
    <Router history={hashHistory}>
        <Route path='/' component={App}></Route>
    </Router>
), document.getElementById('app'));
