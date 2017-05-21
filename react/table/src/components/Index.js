import React,{Component} from 'react';
import Table from './Table.js';

export default class Index extends Component{
  constructor(p){
    super(p);
    this.state = {
      tables:[]
    };
  }

  componentDidMount(){
    setInterval(()=>{
      $.get('/api/v1/table')
      .then(res =>{
          this.setState({tables:res.data});
      });
    },1000);
  }
  render(){
    return (
      <div>
        {
          this.state.tables.map(ele => 
            {
              return (<Table ele={ele} />);
            })
        }
      </div>
    );
  }
}
