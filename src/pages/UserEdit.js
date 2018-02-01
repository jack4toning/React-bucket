import React from 'react';
import HomeLayout from '../layouts/HomeLayout.js';
import UserEditor from '../components/UserEditor.js';

class UserEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user:null
        }
    }

    componentWillMount(){
        const userId = this.context.router.params.id;
        fetch('http://localhost:3000/user/'+userId)
        .then(res=>res.json())
        .then(res=>{
                this.setState({
                    user:res
                })
            })
    }

    render(){
        const{user} = this.state;
        return(
            <HomeLayout title = "�༭�û�">
                {
                    user?<UserEditor editTarget={user} />:'������...'
                }
            </HomeLayout>
        )
    }
}

UserEdit.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default UserEdit;