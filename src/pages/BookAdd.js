import React from 'react';
import PropTypes from 'prop-types'
import HomeLayout from '../layouts/HomeLayout';
import BookEditor from '../components/BookEditor';

class BookAdd extends React.Component {
  render () {
    return (
      <HomeLayout title="添加图书">
        <BookEditor/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <a href="" onClick={()=>this.context.router.push('/')}>&lt;--返回主页</a>
      </HomeLayout>
    );
  }
}

BookAdd.contextTypes = {
  router: PropTypes.object.isRequired
};

export default BookAdd;
