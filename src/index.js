import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory} from 'react-router';
import UserAddPage from './pages/UserAdd.js';
import HomePage from './pages/Home.js';

//ReactDOM.render((<div>Hello React!</div>),document.getElementById('app'));

ReactDOM.render(
    (<Router history={hashHistory}>
        <Route path="/" component={HomePage} />
        <Route path="/user/add" component={UserAddPage} />
    </Router>),
    document.getElementById('app'));