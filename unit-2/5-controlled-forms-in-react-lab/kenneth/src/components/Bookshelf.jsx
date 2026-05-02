import React, { useState } from "react";
import { useEffect } from "react";

const BookShelf = () => {
  const [books, setBooks] = useState([
    { title: "Fourth Wing", author: "Rebecca Yarros" },
    { title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis" },
  ]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setNewBook((prevNewBook) => ({
      ...prevNewBook,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setBooks((prevBooks) => [...prevBooks, newBook]);
    setNewBook({
      title: "",
      author: "",
    });
  };

  return (
    <div className="bookshelfDiv">
      <div className="formDiv">
        <h3>Add a Book</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title-text">Title:</label>
          <input
            onChange={handleInputChange}
            id="title-text"
            type="text"
            value={newBook.title}
            name="title"
            required
          ></input>
          <label htmlFor="author-text">Author:</label>
          <input
            onChange={handleInputChange}
            id="author-text"
            type="text"
            value={newBook.author}
            name="author"
            required
          ></input>
          <button>Add Book</button>
        </form>
      </div>
      <div className="bookCardsDiv">
        {books.map((book, idx) => (
          <div key={idx} className="bookCard">
            <h3>{book.title}</h3>
            <p>by {book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookShelf;
