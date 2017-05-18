import React, { Component } from 'react';
import TypeList from './TypeList.js';
import List from './List.js';
import Detail from './Detail.js';

export default class Index extends Component {
  constructor(p) {
      super(p);
      this.state = {
        activeClassID:-1,
        activeDishID:-1
      };
  }

  render() {
      return (
          <div className="manager-end">
              <TypeList 
               change={(ele)=>{
                   this.setState({
                       activeClassID:ele.ID
                   })
               }}
              />
              <List 
               change={(ele)=>{
                    this.setState({
                        activeDishID:ele.ID
                    });
               }}
               classID={this.state.activeClassID}
              />

              <Detail 
               dishID={this.state.activeDishID}
              />
            </div>
        );
    }
}
