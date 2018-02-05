import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory} from 'react-router';
import HomePage from './pages/Home.js';
import HomeLayout from './layouts/HomeLayout.js';
import UserAddPage from './pages/UserAdd.js';
import UserListPage from './pages/UserList.js';
import UserEditPage from './pages/UserEdit.js';
import BookAddPage from './pages/BookAdd';
import BookListPage from './pages/BookList';
import BookEditPage from './pages/BookEdit';


ReactDOM.render(
    (<Router history={hashHistory}>
        <Route path="/" component={HomePage} />
        <Route path="/" component={HomeLayout}>
            <Route path="/user/add" component={UserAddPage} />
            <Route path="/user/list" component={UserListPage} />
            <Route path="/user/edit/:id" component={UserEditPage} />
            <Route path="/book/add" component={BookAddPage}/>
            <Route path="/book/list" component={BookListPage}/>
            <Route path="/book/edit/:id" component={BookEditPage}/>
        </Route>
    </Router>),
document.getElementById('app'));
