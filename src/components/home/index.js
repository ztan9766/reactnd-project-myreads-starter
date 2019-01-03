import React from "react";
import * as Book from "../book";
import * as BooksAPI from "../../actions/BooksAPI";

class home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelves: [
        {
          key: 'currentlyReading',
          text: 'Currently Reading',
          books: []
        },
        {
          key: 'wantToRead',
          text: 'Want to Read',
          books: []
        },
        {
          key: 'read',
          text: 'Read',
          books: []
        }
      ]
    };
  }
  async getBooks() {
    try {
      const books = await BooksAPI.getAll();
      for (const book of books) {
        for (const shelf of this.state.shelves) {
          if(shelf.key === book.shelf) shelf.books.push(book)
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.state.shelves.map(({key, text, books}) => (
              <div className="bookshelf" key={key}>
                <h2 className="bookshelf-title">{ text }</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    { books.length > 0 && books.map((book, key) => (
                      <li key={key}>
                        <Book url={book.imageLinks.thumbnail} title={book.title} author={book.author}></Book>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => this.props.history.push("/search")}>
            Add a book
          </button>
        </div>
      </div>
    );
  }
}

export default home;
