import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Index from './Index.js';

// 最终渲染
ReactDom.render((
  <Router history={hashHistory}>
      <Route path="/" component={Index} />
    </Router>
), document.getElementById('app'));
