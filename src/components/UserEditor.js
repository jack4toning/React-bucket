import React from 'react';
import FormItem from '../components/FormItem.js';
import formProvider from '../utils/formProvider.js';

class UserEditor extends React.Component{
    handleSubmit(e){
        //��ֹ��submit�¼��Զ���תҳ��Ķ���
        e.preventDefault();
        //alert(JSON.stringify(this.state));
        const {form:{name,age,gender},formValid,editTarget} = this.props;
        if(!formValid){
            alert('������ȷ��д������');
            return;
        }

        let editType = '���';
        let apiUrl = 'http://localhost:3000/user';
        let method = 'post';
        if(editTarget){
            editType = '�༭';
            apiUrl +='/'+editTarget.id;
            method = 'put';
        }


        fetch(apiUrl,
            {
                method,
                //ʹ��fetch�ύ��json������Ҫʹ��JSON.stringifyת��Ϊ�ַ���
                body:JSON.stringify({
                    name:name.value,
                    age:age.value,
                    gender:gender.value
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            //fetch�������url�ɹ��᷵��һ��״̬Ϊresolved��promise���󣬸ö���resolved���ظ�then�Ĳ���resΪ����json���ַ�����ʽ
            //����json�൱���Ǵ���ȥ��json������һ��id�У��൱�������ݿ�ı��м�һ�У�û��ָ������ֵ�����ݿ��Լ�����һ���������������
            //����json�����ݿ���յ����ݺ󷵻ص���������һ��
            /*
             {
             id,
             name,
             age,
             gender
             }

             */
            //res��response����д
            .then((res)=>res.json())
            .then((res)=>{
                if(res.id){
                    alert(editType+'�û��ɹ���');
                    this.context.router.push('/user/list');
                    //this.context.router.push������ת����·����·���ж�Ӧ�����
                }else{
                    alert(editType+'�û�ʧ�ܣ�');
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
                <FormItem label={'�û�����'} valid={name.valid} error={name.error}>
                    <input type="text" value={name.value} onChange={(e)=>onFormChange('name',e.target.value)}/>
                </FormItem>
                <FormItem label={'���䣺'} valid={age.valid} error={age.error}>
                    <input type="number" value={age.value||''} onChange={(e)=>onFormChange('age',e.target.value)} />
                </FormItem>
                <FormItem label={'�Ա�'} valid={gender.valid} error={gender.error}>
                    <select value={gender.value} onChange={(e)=>onFormChange('gender',e.target.value)}>
                        <option value="">��ѡ��</option>
                        <option value="male">��</option>
                        <option value="female">Ů</option>
                    </select>
                </FormItem>
                <input type="submit" value="�ύ" />
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
                error:'�������û���'
            },
            {
                pattern:/^.{1,4}$/,
                error:'�û������ܳ���4���ַ�'
            }
        ]
    },
    age:{
        defaultValue:0,
        rules:[
            {
                pattern:value=>value>=1&&value<=100,
                error:'������0~100������'
            },
            {
                //pattern:value=>value===Math.floor(value),
                pattern: function (value) {
                    value = +value;
                    return (value===Math.floor(value))
                },
                error:'����������'
            }
        ]
    },
    gender:{
        defaultValue:'',
        rules:[
            {
                //pattern:value=>value=='male'||value=='female',
                pattern:value=>!!value,
                error:'��ѡ���Ա�'
            }
        ]
    }
})(UserEditor);

export default UserEditor;