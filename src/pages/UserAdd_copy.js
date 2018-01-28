import React from 'react';
import formProvider from '../utils/formProvider';

class UserAdd extends React.Component {
    handleSubmit (e) {
        e.preventDefault();

        const {form: {name, age, gender}, formValid} = this.props;
        if (!formValid) {
            alert('����д��ȷ����Ϣ������');
            return;
        }

        fetch('http://localhost:3000/user', {
            method: 'post',
            body: JSON.stringify({
                name: name.value,
                age: age.value,
                gender: gender.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.id) {
                    alert('����û��ɹ�');
                } else {
                    alert('���ʧ��');
                }
            })
            .catch((err) => console.error(err));
    }
    render () {
        const {form: {name, age, gender}, onFormChange} = this.props;
        return (
            <div>
                <header>
                    <h1>����û�</h1>
                </header>

                <main>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <label>�û�����</label>
                        <input
                            type="text"
                            value={name.value}
                            onChange={(e) => onFormChange('name', e.target.value)}
                            />
                        {!name.valid && <span>{name.error}</span>}
                        <br/>
                        <label>���䣺</label>
                        <input
                            type="number"
                            value={age.value || ''}
                            onChange={(e) => onFormChange('age', +e.target.value)}
                            />
                        {!age.valid && <span>{age.error}</span>}
                        <br/>
                        <label>�Ա�</label>
                        <select
                            value={gender.value}
                            onChange={(e) => onFormChange('gender', e.target.value)}
                            >
                            <option value="">��ѡ��</option>
                            <option value="male">��</option>
                            <option value="female">Ů</option>
                        </select>
                        {!gender.valid && <span>{gender.error}</span>}
                        <br/>
                        <br/>
                        <input type="submit" value="�ύ"/>
                    </form>
                </main>
            </div>
        );
    }
}

UserAdd = formProvider({
    name: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return value.length > 0;
                },
                error: '�������û���'
            },
            {
                pattern: /^.{1,4}$/,
                error: '�û������4���ַ�'
            }
        ]
    },
    age: {
        defaultValue: 0,
        rules: [
            {
                pattern: function (value) {
                    return value >= 1 && value <= 100;
                },
                error: '������1~100������'
            }
        ]
    },
    gender: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return !!value;
                },
                error: '��ѡ���Ա�'
            }
        ]
    }
})(UserAdd);

export default UserAdd;