import React, { Component } from 'react';
import TypeList from './TypeList.js';
import List from './List.js';
import MenuDetail from './MenuDetail.js';

export default class Index extends Component {
  constructor(p) {
      super(p);
  }
  
  render() {
      return (
          <div className="manager-end">
              <TypeList />
              <List />
              <MenuDetail />
            </div>
        );
    }
}

