import React from 'react';
import HomeLayout from '../layouts/HomeLayout.js';
import UserEditor from '../components/UserEditor.js';

class UserAdd extends React.Component{

    render(){
        return(
                <HomeLayout title={"添加用户"}>
                    <UserEditor />
                    <br/>
                    <a href="javascript:void(0)" onClick={()=>this.context.router.push('/')}>&lt;--返回主页</a>
                </HomeLayout>
        );
    }
}



UserAdd.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default  UserAdd;