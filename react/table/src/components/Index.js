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
          if(!res.success)
            return alert(res.data);
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
