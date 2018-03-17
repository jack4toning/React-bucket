import React from 'react';
import PropTypes from 'prop-types';
import request from '../utils/request';
import {Form,Input,InputNumber,Select,Button,message} from 'antd';

const FormItem = Form.Item;

const formLayout = {
    labelCol:{
        span:4
    },
    wrapperCol:{
        span:16
    }
};


class UserEditor extends React.Component{
    handleSubmit(e){
        e.preventDefault();

        const {form,editTarget} = this.props;

        form.validateFields((err,values)=>{
            if(!err){
                let editType = '添加';
                let apiUrl = 'http://localhost:3000/user';
                let method = 'post';
                if(editTarget){
                    editType = '编辑';
                    apiUrl +='/'+editTarget.id;
                    method = 'put';
                }

                request(method,apiUrl,values)
                    .then((res)=>{
                        if(res.id){
                            message.success(editType+'用户成功！');
                            this.context.router.push('/user/list');
                        }else{
                            message.error(editType+'用户失败！');
                        }
                    })
                    .catch((err)=>console.error(err));
            }else{
                message.warn(err);
            }
        });
    }

    componentDidMount(){
        const {editTarget, form} = this.props;
        if(editTarget){
            form.setFieldsValue(editTarget);
        }
    }

    render(){
        const {form} = this.props;
        const {getFieldDecorator} = form;


        return(
        <div>
            <Form onSubmit={(e)=>this.handleSubmit(e)} style={{width:'400px'}}>
                <FormItem label="用户名：" {...formLayout}>
                    {getFieldDecorator('name',{
                        rules:[
                            {
                                required:true,
                                message:'请输入用户名'
                            },
                            {
                                pattern:/^.{1,4}$/,
                                message:'用户名最多4个字符'
                            }
                        ]
                    })(
                        <Input type="text" />
                    )}
                </FormItem>
                <FormItem label="年龄：" {...formLayout}>
                    {getFieldDecorator('age',{
                        rules:[
                            {
                                required:true,
                                message:'请输入年龄',
                                type:'number'
                            },
                            {
                                min:1,
                                max:100,
                                message:'请输入1~100的年龄',
                                type:'number'
                            }
                        ]
                    })(
                        <InputNumber />
                    )}
                </FormItem>
                <FormItem label="性别：" {...formLayout} >
                    {getFieldDecorator('gender',{
                        rules:[
                            {
                                required:true,
                                message:'请选择性别'
                            }
                        ]
                    })(
                        <Select placeholder="请选择" >
                            <Select.option value="male">男</Select.option>
                            <Select.option value="female">女</Select.option>
                        </Select>
                    )}
                </FormItem>
                <FormItem wrapperCol={{...formLayout.wrapperCol, offset: formLayout.labelCol.span}}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        </div>
        );
    }
}

UserEditor.contextTypes = {
    router:PropTypes.object.isRequired
};

UserEditor = Form.create()(UserEditor);

export default UserEditor;