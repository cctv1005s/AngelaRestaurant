import React,{Component} from 'react';
import Menu from './Menu.js';
import Footer from './Footer.js';

export default class Index extends Component{
    render(){
        return (
            <div>
                <Menu />
                <Footer />
            </div>
        );
    }
}