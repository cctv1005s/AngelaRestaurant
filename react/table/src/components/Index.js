import React,{Component} from 'react';
import Table from './Table.js';

//* *********************************************** */
// 模拟数据部分
var tables = [];
for (let i = 0; i < 10; i++) {
  var colors = ['YELLOW', 'GREEN', 'RED'];
  tables.push({
    ID: i,
    Status: colors[parseInt(Math.random() * 3)],
  });
}

//* ************************************************* */
export default class Index extends Component{
  componentDidMount(){
    
  }
  return (
    <div>
      {
        tables.map(ele => (<Table ele={ele} />))
      }
    </div>
  );
}
