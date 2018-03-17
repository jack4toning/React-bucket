import React from 'react';
import PropTypes from 'prop-types'
import BookEditor from '../components/BookEditor';

class BookAdd extends React.Component {
  render () {
    return (
        <div>
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
        </div>
    );
  }
}

BookAdd.contextTypes = {
  router: PropTypes.object.isRequired
};

export default BookAdd;
