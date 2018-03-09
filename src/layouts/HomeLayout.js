import React from 'react';
import {Link} from 'react-router';
import {Menu,Icon} from 'antd';
import style from '../styles/home-layout.less';



class HomeLayout extends React.Component {
    render(){
        const {title,children} = this.props;
        return(
            <div>
                <header>
                    <h1>{title}</h1>
                </header>
                <main>
                    {children}
                </main>
            </div>
        )
    }
}

export default  HomeLayout;


