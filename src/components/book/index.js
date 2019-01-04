import React from "react";
import * as BooksAPI from "../../actions/BooksAPI";

export default class Book extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      book: {},
      url: "",
      author: "",
      title: "",
      id: this.props.id,
      shelf: "none"
    }
    this.getBook(this.state.id)
  }
  

  change(event) {
    const el = event.target;
    if (el.selectedIndex && el.options[el.selectedIndex].value) {
      if (el.options[el.selectedIndex].value === "none") {
        event.preventDefault();
      } else {
        this.props.update(this.state.book, el.options[el.selectedIndex].value);
      }
    }
  }

  async getBook(bookId){
    let book = await BooksAPI.get(bookId)
    this.setState({
      book: book,
      url: book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : "",
      author: book.author || "",
      title: book.title || "",
      shelf: book.shelf
    })
  }

  render() {
    return (
      this.state.book.id ? (<div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${this.state.url}")`
            }}
          />
          <div className="book-shelf-changer">
            <select
              onChange={e => this.change(e)}
              defaultValue={this.state.shelf}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.state.title}</div>
        <div className="book-authors">{this.state.author}</div>
      </div>) : ""
    )
  }
}
