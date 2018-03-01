import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import request,{get} from '../utils/request';

class BookList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      bookList: []
    };
  }

  componentWillMount () {
/*    fetch('http://localhost:3000/book')
      .then(res => res.json())*/
    get('http://localhost:3000/book')
      .then(res => {
        this.setState({
          bookList: res
        });
      });
  }

  handleEdit (book) {
    this.context.router.push('/book/edit/' + book.id);
  }

  handleDel (book) {
    const confirmed = window.confirm(`确定要删除图书 ${book.name} 吗？`);

    if (confirmed) {
      fetch('http://localhost:3000/book/' + book.id, {
        method: 'delete'
      })
        .then(res => res.json())
        .then(res => {
          this.setState({
            bookList: this.state.bookList.filter(item => item.id !== book.id)
          });
          alert('删除图书成功');
        })
        .catch(err => {
          console.error(err);
          alert('删除图书失败');
        });
    }
  }

  render () {
    const {bookList} = this.state;

    return (
      <HomeLayout title="图书列表">
        <table>
          <thead>
          <tr>
            <th>图书ID</th>
            <th>书名</th>
            <th>价格</th>
            <th>所有者ID</th>
            <th>操作</th>
          </tr>
          </thead>

          <tbody>
          {
            bookList.map((book) => {
              return (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.name}</td>
                  <td>&yen;{book.price}</td>
                  <td>{book.owner_id}</td>
                  <td>
                    <a href="javascript:void(0)" onClick={() => this.handleEdit(book)}>编辑</a>
                    &nbsp;
                    <a href="javascript:void(0)" onClick={() => this.handleDel(book)}>删除</a>
                  </td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
        <a href="javascript:void(0)" onClick={()=>this.context.router.push('/')}>&lt;--返回主页</a>
      </HomeLayout>
    );
  }
}

BookList.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default BookList;