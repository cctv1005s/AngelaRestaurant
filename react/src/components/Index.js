import React,{Component} from 'react';
import Menu from './Menu.js';
import Footer from './Footer.js';

export default class Index extends Component{
    constructor(p){
        super(p);
        this.state = {
            Ordered:{}
        };  
    }

    handleChange(Ordered){
        this.setState({
            Ordered:Ordered
        });
    }

    render(){
        var self = this;
        return (
            <div>
                <Menu 
                 onChange={self.handleChange.bind(this)}
                />
                <Footer 
                 Ordered = {self.state.Ordered}
                />
            </div>
        );
    }
}