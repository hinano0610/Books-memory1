import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

export const BookDetails = () => {
  const [note, setNote] = useState("");
  const [book, setBook] = useState(null);
  const { bookId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${bookId}`,
        );
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fatching data:", error);
      }
    };
    fetchBookDetails();
  }, [bookId]);

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleAddToShelf = () => {
    console.log("本を本棚に追加しました");
    history.push("/MyBooksShelf");
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>本の登録</h1>
      {/* <Link to="/MyBooksShelf">Back to list</Link> */}
      <div>
        <strong>{book.title}</strong>
        <br />
        {book.author && <span>Author: {book.author}</span>}
        <br />
        <img src={book.image} alt={book.title} />
      </div>
      <p>{book.description}</p>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="感想を記入してください"
          value={note}
          onChange={handleNoteChange}
        ></textarea>
        <button onClick={handleAddToShelf}>感想を保存</button>
      </form>
    </div>
  );
};