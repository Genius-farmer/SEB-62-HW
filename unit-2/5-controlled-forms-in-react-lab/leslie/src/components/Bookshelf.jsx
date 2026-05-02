import React, { useState } from "react";
import "./Bookshelf.css";

const Bookshelf = () => {
  const [books, setBooks] = useState([
    { title: "Fourth Wing", author: "Rebecca Yarros" },
    { title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis" },
  ]);
  const initNewBook = { title: "", author: "" };
  const [newBook, setNewBook] = useState(initNewBook);

  const handleInputChange = (e) => {
    setNewBook((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    if (newBook.title && newBook.author) {
      setBooks((prevState) => [...books, { ...newBook }]);
      setNewBook(initNewBook);
    }
  };

  return (
    <div className="bookshelfDiv">
      <div className="formDiv">
        <h3>Add a Book</h3>
        <label htmlFor="bookTitle">Title:</label>
        <input id="bookTitle" name="title" value={newBook.title} onChange={handleInputChange} />
        <label htmlFor="bookAuthor">Author:</label>
        <input id="bookAuthor" name="author" value={newBook.author} onChange={handleInputChange} />
        <button onClick={handleSubmit}>Add Book</button>
      </div>
      <div className="bookCardsDiv">
        {books.map((item) => (
          <div>
            <h4>{item.title}</h4>
            <p>by {item.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;
