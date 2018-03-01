import React from 'react';
import PropTypes from 'prop-types';
import HomeLayout from '../layouts/HomeLayout';
import FormItem from '../components/FormItem';
import {post} from '../utils/request';
import formProvider from '../utils/formProvider';

class Login extends React.Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        const {formValid,form:{account,password}} = this.props;
        if(!formValid){
            alert('«Î ‰»Î’À∫≈ªÚ√‹¬Î');
            return;
        }

        post('http://localhost:3000/login',{
            account:account.value,
            password:password.value
        })
        .then((res)=>{
                if(res){
                    this.context.router.push('/');
                }else{
                    alert('µ«¬Ω ß∞‹£¨’À∫≈ªÚ√‹¬Î¥ÌŒÛ');
                }
            })
    }

    render(){
        const {form:{account,password},onFormChange} = this.props;
        return(
            <HomeLayout title="«Îµ«¬º">
                <form onSubmit={this.handleSubmit}>
                    <FormItem label="’À∫≈£∫" valid={account.valid} error={account.error}>
                        <input type="text" value={account.value} onChange={e=>onFormChange('account',e.target.value)} />
                    </FormItem>
                    <FormItem label="√‹¬Î£∫" valid={password.valid} error={password.error} >
                        <input type="password" value={password.value} onChange={e=>onFormChange('password',e.target.value)}  />
                    </FormItem>
                    <br />
                    <input type="submit" value="µ«¬º" />
                </form>
            </HomeLayout>
        )
    }

}


Login.contextTypes = {
    router:PropTypes.object.isRequired
};

Login = formProvider({
   account:{
       defaultValue:'',
       rules:[
           {
               pattern(value){
               return value.length>0
                },
               error:'«Î ‰»Î’À∫≈'
           }
       ]
   }
});