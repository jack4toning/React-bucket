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
                this.setFormValues = this.setFormValues.bind(this);
            }

            setFormValues(values){
                if(!values){
                    return;
                }
                const {form} = this.state;
                let newForm = {...form};
                for(const field in form){
                    if(form.hasOwnProperty(field)){
                        if(typeof values[field]!=='undefined'){
                            newForm[field].value = values[field];
                            //newForm[field] = {...newForm[field], value: values[field]};  作者写的，编译不对
                        }
                        //正常情况下主动设置的每个字段一定是有效的
                        newForm[field].valid = true;
                    }
                }
                this.setState({form:newForm});
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
                return <Comp
                                {...this.props}
                                form={form}
                                formValid={formValid}
                                onFormChange={this.handleValueChange}
                                setFormValues={this.setFormValues}
                            />;
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