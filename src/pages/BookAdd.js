import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import BookEditor from '../components/BookEditor';

class BookAdd extends React.Component {
  render () {
    return (
      <HomeLayout title="添加图书">
        <BookEditor/>
        <a href="javascript:void(0)" onClick={()=>this.context.router.push('/')}>&lt;--返回主页</a>
      </HomeLayout>
    );
  }
}

BookAdd.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default BookAdd;
