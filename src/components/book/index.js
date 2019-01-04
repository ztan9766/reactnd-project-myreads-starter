import React from "react";

export default class Book extends React.Component {
  change(event) {
    const el = event.target;
    if (el.selectedIndex && el.options[el.selectedIndex].value) {
      if (el.options[el.selectedIndex].value === "none") {
        event.preventDefault();
      } else {
        this.props.update(this.props.item, el.options[el.selectedIndex].value);
      }
    }
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${this.props.item.imageLinks.thumbnail}")`
            }}
          />
          <div className="book-shelf-changer">
            <select
              onChange={e => this.change(e)}
              defaultValue={this.props.item.shelf}
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
        <div className="book-title">{this.props.item.title}</div>
        <div className="book-authors">{this.props.item.author}</div>
      </div>
    );
  }
}
