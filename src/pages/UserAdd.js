import React from 'react';
import formProvider from '../utils/formProvider.js';
import FormItem from '../components/FormItem.js';
import PropTypes from 'prop-types';
import HomeLayout from '../layouts/HomeLayout.js';

class UserAdd extends React.Component{
    handleSubmit(e){
        //阻止表单submit事件自动跳转页面的动作
        e.preventDefault();
        //alert(JSON.stringify(this.state));
        const {form:{name,age,gender},formValid} = this.props;
        if(!formValid){
            alert('请填正确填写后重试');
            return;
        }
        fetch(
            'http://localhost:3000/user',{
                method:'post',
                //使用fetch提交的json数据需要使用JSON.stringify转换为字符串
                body:JSON.stringify({
                    name:name.value,
                    age:age.value,
                    gender:gender.value
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            //fetch如果访问url成功会返回一个状态为resolved的promise对象，该对象resolved返回给then的参数res为以下json的字符串格式
            //以下json相当于是传出去的json加上了一个id列（相当于往数据库的表中加一行，没有指定主键值，数据库自己给这一行添加了主键。）
            //以下json是数据库接收到数据后返回的新增的那一行
            /*
                {
                    id,
                    name,
                    age,
                    gender
                }

             */
            //res是response的缩写
        .then((res)=>res.json())
        .then((res)=>{
                if(res.id){
                    alert('添加用户成功！');
                    this.context.router.push('/user/list');
                    //this.context.router.push用来跳转到该路径在路由中对应的组件
                }else{
                    alert('添加用户失败！');
                }
            })
        .catch((err)=>console.error(err));

    }
    render(){
        const {form:{name,age,gender},onFormChange} = this.props;
        return(
                <HomeLayout title={"添加用户"}>
                    <form onSubmit={(e)=>this.handleSubmit(e)}>
                        <FormItem label={'用户名：'} valid={name.valid} error={name.error}>
                            <input type="text" value={name.value} onChange={(e)=>onFormChange('name',e.target.value)}/>
                        </FormItem>
                        <FormItem label={'年龄：'} valid={age.valid} error={age.error}>
                            <input type="number" value={age.value||''} onChange={(e)=>onFormChange('age',e.target.value)} />
                        </FormItem>
                        <FormItem label={'性别：'} valid={gender.valid} error={gender.error}>
                            <select value={gender.value} onChange={(e)=>onFormChange('gender',e.target.value)}>
                                <option value="">请选择</option>
                                <option value="male">男</option>
                                <option value="female">女</option>
                            </select>
                        </FormItem>
                        <input type="submit" value="提交" />
                    </form>
                </HomeLayout>
        );
    }
}

UserAdd.contextTypes = {
    router:PropTypes.object.isRequired
    //通过给UserAdd定义一个包含router属性的contextTypes，使得组件中可以通过this.context.router来使用React Router提供的方法
};

UserAdd = formProvider(
    {
        name:{
            defaultValue:'',
            rules:[
                {
                    pattern:value=>value.length>0,
                    error:'请输入用户名'
                },
                {
                    pattern:/^.{1,4}$/,
                    error:'用户名不能超过4个字符'
                }
            ]
        },
        age:{
            defaultValue:0,
            rules:[
                {
                    pattern:value=>value>=1&&value<=100,
                    error:'请填入0~100的数字'
                },
                {
                    //pattern:value=>value===Math.floor(value),
                    pattern: function (value) {
                        value = +value;
                      return (value===Math.floor(value))
                    },
                    error:'请填入整数'
                }
            ]
        },
        gender:{
            defaultValue:'',
            rules:[
                {
                    //pattern:value=>value=='male'||value=='female',
                    pattern:value=>!!value,
                    error:'请选择性别'
                }
            ]
        }
    }
)(UserAdd);

export default  UserAdd;