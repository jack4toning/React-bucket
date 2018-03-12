import React from 'react';
import PropTypes from 'prop-types'
import HomeLayout from '../layouts/HomeLayout.js';
import UserEditor from '../components/UserEditor.js';

class UserAdd extends React.Component{

    render(){
        return(
                <HomeLayout title={"添加用户"}>
                    <UserEditor />
                    <br/>
                    <a href="" onClick={(e)=>{e.preventDefault();this.context.router.push('/')}}>&lt;--返回主页</a>
                </HomeLayout>
        );
    }
}



UserAdd.contextTypes = {
    router: PropTypes.object.isRequired
};

export default  UserAdd;
//javascript:void(0)