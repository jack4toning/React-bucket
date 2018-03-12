import React from 'react';
import PropTypes from 'prop-types'
import HomeLayout from '../layouts/HomeLayout.js';
import UserEditor from '../components/UserEditor.js';
import {get} from '../utils/request';

class UserEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user:null
        }
    }

    componentWillMount(){
        const userId = this.context.router.params.id;
/*        fetch('http://localhost:3000/user/'+userId)
        .then(res=>res.json())*/
        get('http://localhost:3000/user/'+userId)
        .then(res=>{
                this.setState({
                    user:res
                })
            })
    }

    render(){
        const{user} = this.state;
        return(
            <HomeLayout title = "编辑用户">
                {
                    user?<UserEditor editTarget={user} />:'加载中...'
                }
            </HomeLayout>
        )
    }
}

UserEdit.contextTypes = {
  router: PropTypes.object.isRequired
};

export default UserEdit;