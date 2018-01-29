import React from 'react';

function formProvider(fields){
    return function (Comp) {
        const initialFormState = {};
        for(const key in fields){
            initialFormState[key] = {
                value:fields[key].defaultValue,
                error:''
            };
        }

        class FormComponent extends React.Component{
            constructor(props) {
                super(props);
                this.state = {
                    form: initialFormState,
                    formValid: false
                };
                this.handleValueChange = this.handleValueChange.bind(this);
            }
            handleValueChange(fieldName,value){
                const {form} = this.state;
                const newFieldState = {value,valid:true,error:''};
                const fieldRules = fields[fieldName].rules;
                for(let i = 0;i<fieldRules.length;i++){
                    const{pattern,error} = fieldRules[i];
                    let valid = false;
                    if(typeof pattern === 'function'){
                        valid = pattern(value);
                    }else{
                        valid = pattern.test(value);
                    }
                    if(!valid){
                        newFieldState.valid = false;
                        newFieldState.error = error;
                        break;
                    }
                }
                const newForm = {...form,[fieldName]:newFieldState};
                const formValid = Object.values(newForm).every(f=>f.valid);

                this.setState({
                    form:newForm,
                    formValid
                });
            }
            render(){
                const {form,formValid} = this.state;
                return <Comp {...this.props} form={form} formValid={formValid} onFormChange={this.handleValueChange} />
                //将传入的Comp加入props属性后渲染传出
            }
        }
        return FormComponent;
    }
}

export default formProvider;

/*
    注释：
            formProvider的第一个参数fields是一个对象，其结构为：

             // 表示表单中有name、age、gender3个字段
             const fields = {
             name: {
             defaultValue: '',
             rules: [
             {
             // pattern用于对值进行校验，可以为方法或一个RegExp对象
             // 若方法的返回值为一个真值或RegExp.test(value)返回true则校验通过
             pattern: function (value) {
             return value.length > 0;
             },
             // 每个pattern对应一个error信息
             error: '请输入用户名'
             },
             {
             pattern: /^.{1,4}$/,
             error: '用户名最多4个字符'
             }
             ]
             },
             age: {...},
             gender: {...}
             }
 */