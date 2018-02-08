import React from 'react';
import PropTypes from 'prop-types';
import style from '../styles/auto-complete.less';


//��ʱ��������ʾ��ֵ��һ����������Ҫ�õ���ֵ��������Ϊʲô��������Ĵ�������һ��getItemValue�����ˡ�
function getItemValue(item){
    return item.value||item;
}


class AutoComplete extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            displayValue:'',
            activeItemIndex:-1
        };
    this.handleLeave = this.handleLeave.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    };


    handleChange(value){
        this.setState({activeItemIndex:-1,displayValue:''});
        this.props.onValueChange(value);
    }

    handleKeyDown(e){
        const {activeItemIndex} = this.state;
        const {options} = this.props;

        switch (e.keyCode){
            //13Ϊ�س����ļ���(keyCode)
                case 13:{
                    //�ж��Ƿ����б����ѡ��״̬
                    if(activeItemIndex>=0){
                        //��ֹ���»س������Զ��ύ��
                        e.preventDefault();
                        e.stopPropagation();
                        this.handleChange(getItemValue(options[activeItemIndex]))
                    }
                    break;
                }
                //38Ϊ�Ϸ������40Ϊ�·����
                case 38:
                case 40: {
                    e.preventDefault();
                    //ʹ��moveItem���������»�ȡ��ѡ����
                    this.moveItem(e.keyCode===38?'up':'down');
                    break;
                }
        }
    }

    moveItem(direction) {
        const {activeItemIndex} = this.state;
        const {options} = this.props;
        const lastIndex = options.length - 1;
        let newIndex = -1;

        //�����µ�activeItemIndex
        if (direction === 'up') {
            if (activeItemIndex === -1) {
                //���û��ѡ������ѡ�����һ��
                newIndex = lastIndex;
            } else {
                newIndex = activeItemIndex - 1;
            }
        } else {
            if (activeItemIndex < lastIndex) {
                newIndex = activeItemIndex + 1;
            }
        }

        //��ȡ�µ�displayValue
        let newDisplayValue = '';
        if (newIndex >= 0) {
            newDisplayValue = getItemValue(options[newIndex]);
        }

        //����״̬
        this.setState({
            displayValue:newDisplayValue,
            activeItemIndex:newIndex
        });
    }

    handleEnter(index){
        const currentItem = this.props.options[index];
        this.setState({
            activeItemIndex:index,
            displayValue:getItemValue(currentItem)
        })
    }

    handleLeave(){
        this.setState({
            activeItemIndex:-1,
            displayValue:''
        })
    }

    render(){
        const {displayValue,activeItemIndex} = this.state;
        const {value,options} = this.props;

        return(
            <div className={style.wrapper}>
                <input
                    value={displayValue||value}
                    onChange = {e=>this.handleChange(e.target.value)}
                    onKeyDown = {this.handleKeyDown}
                />
                {options.length>0&&(
                    <ul className={style.options} onMouseLeave = {this.handleLeave}>
                        {
                            options.map((item,index)=>{
                                return(
                                    <li
                                        key={index}
                                        className={activeItemIndex===index?style.active:''}
                                        onMouseEnter = {()=>this.handleEnter(index)}
                                        onClick = {()=>this.handleChange(getItemValue(item))}
                                    >
                                        {item.text||item}
                                    </li>
                                )
                            })
                        }
                    </ul>
                )}
            </div>
        )
    }
}

AutoComplete.propTypes = {
    value:PropTypes.string.isRequired,
    options:PropTypes.array.isRequired,
    onValueChange:PropTypes.func.isRequired
};

export default  AutoComplete;