import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory} from 'react-router';
import UserAddPage from './pages/UserAdd.js';
import UserEditPage from './pages/UserEdit.js';
import HomePage from './pages/Home.js';
import UserListPage from './pages/UserList.js';
import HomeLayout from './layouts/HomeLayout.js';



ReactDOM.render(
    (<Router history={hashHistory}>
        <Route path="/" component={HomePage} />
        <Route path="/" component={HomeLayout}>
            <Route path="/user/add" component={UserAddPage} />
            <Route path="/user/list" component={UserListPage} />
            <Route path="/user/edit/:id" component={UserEditPage} />
        </Route>
    </Router>),
document.getElementById('app'));
