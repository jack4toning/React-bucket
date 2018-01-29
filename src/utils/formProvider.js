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
                //�������Comp����props���Ժ���Ⱦ����
            }
        }
        return FormComponent;
    }
}

export default formProvider;

/*
    ע�ͣ�
            formProvider�ĵ�һ������fields��һ��������ṹΪ��

             // ��ʾ������name��age��gender3���ֶ�
             const fields = {
             name: {
             defaultValue: '',
             rules: [
             {
             // pattern���ڶ�ֵ����У�飬����Ϊ������һ��RegExp����
             // �������ķ���ֵΪһ����ֵ��RegExp.test(value)����true��У��ͨ��
             pattern: function (value) {
             return value.length > 0;
             },
             // ÿ��pattern��Ӧһ��error��Ϣ
             error: '�������û���'
             },
             {
             pattern: /^.{1,4}$/,
             error: '�û������4���ַ�'
             }
             ]
             },
             age: {...},
             gender: {...}
             }
 */