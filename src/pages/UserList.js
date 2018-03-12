import React from 'react';
import PropTypes from 'prop-types'
import HomeLayout from '../layouts/HomeLayout.js';
import {get,del} from '../utils/request';


class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userList:[]
        };
        this.handleEdit = this.handleEdit.bind(this);
    }
    componentWillMount(){
/*        fetch('http://localhost:3000/user')
        .then(res=>res.json())*/
        get('http://localhost:3000/user')
        .then(res=>{
                this.setState({
                    userList:res
                });
            })
    }

    handleEdit(user){
        this.context.router.push(`/user/edit/${user.id}`);
    }
    handleDel(user){
        const confirmed = window.confirm(`确定要删除用户 ${user.name} 吗？`);
        if(confirmed){
          /*  fetch('http://localhost:3000/user/'+user.id,{
                method:'delete'
            })
            .then(res=>res.json())*/
            del('http://localhost:3000/user/'+user.id)
            .then(res=>{
                    this.setState({
                        userList:this.state.userList.filter(item=>item.id!==user.id)
                    });
                    alert(`删除用户 ${user.name}成功`);
                    console.log(res);
                })
            .catch(err=>{
                    console.error(err);
                    alert(`删除用户 ${user.name}失败`);
                })
        }
    }

    render(){
        const {userList} = this.state;

        return(
                <HomeLayout title={"用户列表"}>
                    <table>
                        <thead>
                        <tr>
                            <th>用户ID</th>
                            <th>用户名</th>
                            <th>性别</th>
                            <th>年龄</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            userList.map((user)=> {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.gender}</td>
                                        <td>{user.age}</td>
                                        <td>
                                            <a href="" onClick={()=>this.handleEdit(user)}>编辑</a>
                                            &nbsp;
                                            <a href="" onClick={()=>this.handleDel(user)}>删除</a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    <br/>
                    <a href="" onClick={()=>this.context.router.push('/')}>&lt;--返回主页</a>
                </HomeLayout>
        );
    }
}

UserList.contextTypes = {
    router: PropTypes.object.isRequired
};

export default  UserList;