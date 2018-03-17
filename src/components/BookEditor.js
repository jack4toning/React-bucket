import React from 'react';
import PropTypes from 'prop-types'
import AutoComplete from './AutoComplete';
import request from '../utils/request';
import { Input, InputNumber, Form, Button, message } from 'antd';

const FormItem = Form.Item;

const formLayout = {
  labelCol:{
    span:4
  },
  wrapperCol:{
    span:16
  }
};

class BookEditor extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      recommendUsers: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOwnerIdChange = this.handleOwnerIdChange.bind(this);
  }

  componentDidMount () {
    const {editTarget, form} = this.props;
    if (editTarget) {
      form.setFieldsValue(editTarget);
    }
  }

  handleSubmit (e) {
    e.preventDefault();

    const {form,editTarget} = this.props;


    form.validateFields((err,values)=>{

        if (err) {
          message.warn(err);
          return;
        }

        let editType = '添加';
        let apiUrl = 'http://localhost:3000/book';
        let method = 'post';
        if (editTarget) {
            editType = '编辑';
            apiUrl += '/' + editTarget.id;
            method = 'put';
        }

        request(method,apiUrl,values)
            .then((res) => {
                if (res.id) {
                    message.success(editType + '书本成功');
                    this.context.router.push('/book/list');
                } else {
                    message.error(editType + '失败');
                }
            })
            .catch((err) => console.error(err));
    });
  }

  getRecommendUsers (partialUserId) {
    fetch('http://localhost:3000/user?id_like=' + partialUserId)
        .then((res) => res.json())
        .then((res) => {
          if (res.length === 1 && res[0].id === partialUserId) {
            return;
          }

          this.setState({
            recommendUsers: res.map((user) => {
              return {
                text: `${user.id}（${user.name}）`,
                value: user.id
              };
            })
          });
        });
  }

  timer = 0;
  handleOwnerIdChange (value) {
    this.setState({recommendUsers: []});


    if (this.timer) {
      clearTimeout(this.timer);
    }

    if (value) {
      this.timer = setTimeout(() => {
        this.getRecommendUsers(value);
        this.timer = 0;
      }, 200);
    }
  }


  render () {
    const {recommendUsers} = this.state;
    const {form} = this.props;
    const {getFieldDecorator} = form;

    return (
    <div>
      <Form onSubmit={this.handleSubmit} style={{width:'400px'}}>
        <FormItem label="书名：" {...formLayout}>
            {getFieldDecorator('name',{
                rules:[
                    {
                        required:true,
                        message:'请输入书名',
                    },
                ]
            })(
                <Input type="text" />
            )}
        </FormItem>
        <FormItem label="价格：" {...formLayout}>
            {getFieldDecorator('price',{
                rules:[
                    {
                        required:true,
                        message:'请输入价格',
                        type:'number'
                    },
                    {
                        min:1,
                        max:99999,
                        message:'请输入1-99999的数字',
                        type:'number'
                    }
                ]
            })(
                <InputNumber />
            )}
        </FormItem>
        <FormItem label="所有者：" {...formLayout}>
            {getFieldDecorator('owner_id',{
                rules:[
                    {
                        required:true,
                        message:'请输入所有者ID',
                    },
                    {
                      pattern:/^\d+$/,
                      message:'请输入正确的ID'
                    }
                ]
            })(
              <AutoComplete
                  options={recommendUsers}
                  onValueChange={this.handleOwnerIdChange}
              />
            )}
        </FormItem>
        <FormItem wrapperCol={{span:formLayout.wrapperCol.span,offset:formLayout.labelCol.span}}>
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
    </div>
    );
  }
}

BookEditor.contextTypes = {
  router: PropTypes.object.isRequired
};


BookEditor = Form.create()(BookEditor);

export default BookEditor;
