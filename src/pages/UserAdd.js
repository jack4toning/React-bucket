import React from 'react';
import formProvider from '../utils/formProvider.js';


class UserAdd extends React.Component{
    constructor(){
        super();
        this.state={
            form:{
                name:{
                    valid:false,
                    value:'',
                    error:''
                },
                age:{
                    valid:false,
                    value:0,
                    error:''
                },
                gender:{
                    valid:false,
                    value:'',
                    error:''
                }
            }
        };
    }

    handleValueChange(field,value,type="string"){
        //由于表单的值都是字符串，我们可以根据传入type为number来手动转换value的类型为number类型
        if(type==="number"){
            value=+value;
        }
        const {form} = this.state;
        const newFieldObj = {valid:true,value,error:''};


        //验证用户输入的数据
        switch(field){
            case 'name':{
                if(value.length>=11){
                    newFieldObj.valid = false;
                    newFieldObj.error = '用户名长度不能大于10';
                }else if(value.length===0){
                    newFieldObj.valid = false;
                    newFieldObj.error = '请输入用户名';
                }
                break;
            }
            case 'age':{
                if(value>100||value<=0){
                    newFieldObj.valid = false;
                    newFieldObj.error = '请输入1~100之间的数字';
                }
                break;
            }
            case 'gender':{
                if(!value){
                    newFieldObj.valid = false;
                    newFieldObj.error = '请选择性别';
                }
                break;
            }
            default:
        }


        this.setState({
            form:{
                ...form,
                [field]:newFieldObj
            }
        })
    }
    handleSubmit(e){
        //阻止表单submit事件自动跳转页面的动作
        e.preventDefault();
        //alert(JSON.stringify(this.state));
        const {form:{name,age,gender}} = this.state;
        if(!name.valid||!age.valid||!gender.valid){
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
            //fetch如果访问url成功会返回一个状态为resolved的promise对象，该对象resolved返回给then的参数为以下json的字符串格式
            //以下jason相当于是传出去的json加上了一个id列（相当于往数据库的表中加一行，没有指定主键值，数据库自己给这一行添加了主键。）
            //以下jason是数据库接收到数据后返回的新增的那一行
            /*
                {
                    id,
                    name,
                    age,
                    gender
                }

             */
        .then((res)=>res.json())
        .then((res)=>{
                if(res.id){
                    alert('添加用户成功！');
                    this.setState({
                        form:{
                            name:{
                                valid:false,
                                value:'',
                                error:''
                            },
                            age:{
                                valid:false,
                                value:0,
                                error:''
                            },
                            gender:{
                                valid:false,
                                value:'',
                                error:''
                            }
                        }
                    })
                }else{
                    alert('添加用户失败！');
                }
            })
        .catch((err)=>console.error(err));

    }


    render(){
        const {form:{name,age,gender}} = this.state;
        return(
            <div>
                <header>
                    <h1>添加用户</h1>
                </header>
                <main>
                    <form onSubmit={(e)=>this.handleSubmit(e)}>
                        <label>用户名：</label>
                        <input type="text" value={name.value} onChange={(e)=>this.handleValueChange('name',e.target.value)}/>
                        {!name.valid&&<span>{name.error}</span>}
                        <br />
                        <label>年龄：</label>
                        <input type="number" value={age.value||''} onChange={(e)=>this.handleValueChange('age',e.target.value,'number')} />
                        {!age.valid&&<span>{age.error}</span>}
                        <br />
                        <label>性别：</label>
                        <select value={gender.value} onChange={(e)=>this.handleValueChange('gender',e.target.value)}>
                            <option value="">请选择</option>
                            <option value="male">男</option>
                            <option value="female">女</option>
                        </select>
                        {!gender.valid&&<span>{gender.error}</span>}
                        <br />
                        <br />
                        <input type="submit" value="提交" />
                    </form>
                </main>
            </div>
        );
    }
}

export default  UserAdd;