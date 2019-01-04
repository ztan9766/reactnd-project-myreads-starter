import React from "react";
import Book from "../book";
import * as BooksAPI from "../../actions/BooksAPI";
import emitter from "../../utils/events"

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }
  async changeShelf(book, shelf) {
    if(shelf === book.shelf) return
    emitter.emit("showLoading")
    try{
      await BooksAPI.update(book, shelf)
      alert(`Book ${book.title} has been added to shelf ${shelf}!`)
      emitter.emit("hideLoading")
    }catch (e) {
      console.log(e)
    }
  }

  async search(event) {
    if (event.keyCode === 13) {
      emitter.emit("showLoading")
      const el = event.target;
      try {
        let results = await BooksAPI.search(el.value);
        this.setState({
          results: results
        });
        emitter.emit("hideLoading")
      } catch (e) {
        console.log(e);
      }
    }
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={() => this.props.history.push("/")}
          >
            Close
          </button>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onKeyDown={e => this.search(e)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results.length > 0 &&
              this.state.results.map((book, index) => (
                <li key={index}>
                  <Book
                    item={book}
                    update={(book, shelf) => this.changeShelf(book, shelf)}
                  />
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}
