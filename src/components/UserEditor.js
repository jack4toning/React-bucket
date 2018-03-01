import React from 'react';
import FormItem from '../components/FormItem.js';
import formProvider from '../utils/formProvider.js';
import request,{get} from '../utils/request';

class UserEditor extends React.Component{
    handleSubmit(e){
        //阻止表单submit事件自动跳转页面的动作
        e.preventDefault();
        //alert(JSON.stringify(this.state));
        const {form:{name,age,gender},formValid,editTarget} = this.props;
        if(!formValid){
            alert('请填正确填写后重试');
            return;
        }

        let editType = '添加';
        let apiUrl = 'http://localhost:3000/user';
        let method = 'post';
        if(editTarget){
            editType = '编辑';
            apiUrl +='/'+editTarget.id;
            method = 'put';
        }

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
/*        fetch(apiUrl,
            {
                method,
                //使用fetch提交的json数据需要使用JSON.stringify转换为字符串
                body:JSON.stringify({
                    name:name.value,
                    age:age.value,
                    gender:gender.value
                })
            })
            .then((res)=>res.json())*/
        request(method,apiUrl,{
            name:name.value,
            age:age.value,
            gender:gender.value
        })
            .then((res)=>{
                if(res.id){
                    alert(editType+'用户成功！');
                    this.context.router.push('/user/list');
                    //this.context.router.push用来跳转到该路径在路由中对应的组件
                }else{
                    alert(editType+'用户失败！');
                }
            })
            .catch((err)=>console.error(err));
    }

    componentWillMount(){
        const {editTarget,setFormValues} = this.props;
        if (editTarget){
            setFormValues(editTarget);
        }
    }

    render(){
        const{form:{name,age,gender},onFormChange} = this.props;
        return(
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
        );
    }
}

UserEditor.contextTypes = {
    router:React.PropTypes.object.isRequired
};

UserEditor = formProvider({
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
})(UserEditor);

export default UserEditor;