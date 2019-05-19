import React from 'react';
import '../assets/css/app.scss';
import logo from '../assets/images/logo.svg';
import Home from './home';
import Nav from './nav';
import {Route} from 'react-router-dom'
import Products from './products';


const App = () => (
    <div className="app-container">
        <Nav/>
        <Route exact path="/" component={Home}/>
        <Route path="/products" render={(routingProps)=>{
            return <Products {...routingProps} />
        }}/>
    </div>
);

export default App;
