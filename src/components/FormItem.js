import React from 'react';

class FormItem  extends React.Component{
    render() {
        const {label,children,valid,error} = this.props;
        return (
            <div>
                <label>{label}</label>
                {children}
                {!valid&&<span>{error}</span>}
                <br/>
            </div>
        );
    }
}

export default  FormItem;