import React from 'react';
import PropTypes from 'prop-types'
import BookEditor from '../components/BookEditor';
import {get} from '../utils/request';

class BookEdit extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      book: null
    };
  }

  componentWillMount () {
    const bookId = this.context.router.params.id;
    get('http://localhost:3000/book/' + bookId)
      .then(res => {
        this.setState({
          book: res
        });
      });
  }

  render () {
    const {book} = this.state;
    alert('render'+book);
    return (
      <div>
        {
          book ? <BookEditor editTarget={book}/> : '加载中...'
        }
      </div>
    );
  }
}

BookEdit.contextTypes = {
  router: PropTypes.object.isRequired
};

export default BookEdit;
