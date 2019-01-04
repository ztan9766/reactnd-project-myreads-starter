import React from "react";
import Book from "../book";
import * as BooksAPI from "../../actions/BooksAPI";
import emitter from "../../utils/events"

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelves: [
        {
          key: "currentlyReading",
          text: "Currently Reading",
          books: []
        },
        {
          key: "wantToRead",
          text: "Want to Read",
          books: []
        },
        {
          key: "read",
          text: "Read",
          books: []
        }
      ],
      update: false
    };
  }
  async getBooks() {
    emitter.emit("showLoading")
    try {
      const books = await BooksAPI.getAll();
      for (const shelf of this.state.shelves) {
        //empty shelf every time
        shelf.books = []
        for (const book of books) {
          if (shelf.key === book.shelf) shelf.books.push(book);
        }
      }
      //trigger re-render
      this.setState({update: !this.state.update})
      emitter.emit("hideLoading")
    } catch (e) {
      console.log(e);
    }
  }

  async changeShelf(book, shelf) {
    if(shelf === book.shelf) return
    emitter.emit("showLoading")
    try{
      await BooksAPI.update(book, shelf)
      this.getBooks()
    }catch (e) {
      console.log(e)
    }
  }

  componentDidMount(){
    this.getBooks();
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.state.shelves.map(({ key, text, books }) => (
              <div className="bookshelf" key={key}>
                <h2 className="bookshelf-title">{text}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.length > 0 &&
                      books.map((book, index) => (
                        <li key={index}>
                          <Book
                            item={book}
                            update={ (book,shelf) => this.changeShelf(book,shelf)}
                          />
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
