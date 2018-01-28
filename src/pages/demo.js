function formProvider (fields) {
    return function (Comp) {
        constructor (props) {
            super(props);
            this.state = {
                form: {...},
                formValid: false // ����һ��formValid����������������У��״̬
            };
        }
        handleValueChange (field, value) {...}
        class FormComponent extends React.Component {
            render () {
                const {form, formValid} = this.state;
                return (
                    <Comp {...this.props} form={form} formValid={formValid} onFormChange={this.handleValueChange}/>
                );
            }
        }

        return FormComponent;
    }
}