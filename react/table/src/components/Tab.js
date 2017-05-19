import React,{Component} from 'react';

var style = {
  wrapper: {
    background: 'rgba(0,0,0,0.5)',
    height: '100%',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    'z-index': 20,
  },
  box: {
    height: '60%',
    width: '100%',
    'max-width': '500px',
    background: 'white',
    left: '50%',
    top: '43%',
    transform: 'translate(-50%,-50%)',
    overflow: 'hidden',
    position: 'absolute',
    'z-index': '40',
  },
};

export default class GreenTab extends Component {
  render(){
    if(!this.props.visible)
      return null;

    return (
      <div style={style.wrapper} onClick={this.props.onEnd}>
        <div style={style.box} onClick={(e)=>{e.stopPropagation();}}>
          {this.renderBox()}
        </div>
      </div>
    ); 
  }
}
