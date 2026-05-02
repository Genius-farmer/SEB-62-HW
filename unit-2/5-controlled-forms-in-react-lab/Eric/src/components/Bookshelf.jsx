import { useState } from "react";
import React from "react";

const Bookshelf = () => {
  const [books, setBooks] = useState([
    { title: "Fourth Wing", author: "Rebecca Yarros" },
    { title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis" },
  ]);

  const [newBooks, setNewBooks] = useState({
    title: "",
    author: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBooks((prevBooks) => ({
      ...prevBooks,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setBooks((prevBooks) => [...prevBooks, newBooks]);
    setNewBooks({ title: "", author: "" });
  };

  const mapBooks = books.map((book, index) => (
    <div key={index} className="bookCard">
      <h4>{book.title}</h4>
      <p>{book.author}</p>
    </div>
  ));

  return (
    <>
      <div className="bookshelfDiv">
        <div className="formDiv">
          <h3>Add a Book</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Add Book Title"
              value={newBooks.title}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="author"
              placeholder="Add Author Name"
              value={newBooks.author}
              onChange={handleInputChange}
            />
            <button type="submit">Add Book</button>
          </form>
        </div>
        <div className="bookCardsDiv">{mapBooks}</div>
      </div>
    </>
  );
};

export default Bookshelf;
