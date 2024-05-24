import { useParams, useLocation, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./../styles.css";

export const MyBooksShelf = () => {
  const { bookId } = useParams();
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [note, setNote] = useState("");

  console.log(bookId);

  useEffect(() => {
    const newBookData = location.state ? location.state.bookData : null;
    const noteFromLocation = location.state ? location.state.note : null;
    if (newBookData) {
      setBooks((pverBooks) => [...pverBooks, newBookData]);
    }

    if (noteFromLocation) {
      setNote(noteFromLocation);
    }
    const fetchBooks = async () => {
      try {
        const keys = Object.keys(localStorage).filter((key) =>
          key.startsWith("book_"),
        );
        if (keys.length === 0) return;
        const fetchedBooks = await Promise.all(
          keys
            .map(async (key) => {
              if (!key) return null;
              const bookId = key.split("_")[1];
              const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes/${bookId}`,
              );
              const data = await response.json();
              return { ...data.volumeInfo, note: localStorage.getItem(key) };
            })
            .filter(Boolean),
        );
        setBooks(fetchedBooks);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      }
    };
    fetchBooks();
  }, [location]);

  useEffect(() => {
    const noteFromLocalStorage = localStorage.getItem(`book_${bookId}_note`);
    setNote(noteFromLocalStorage);
  }, [bookId]);

  return (
    <div>
      <h1>本棚ページ</h1>
      <Link to={"/"}>
        <button>ホームに戻る</button>
      </Link>
      {/* <p>本のID: {bookId}</p> */}
      <p>{note}</p>
      {error && <div>{error}</div>}
      <div>
        {books.map((book) => (
          <div key={book.id} className="book-conteiner">
            <>
              {book.imageLinks && (
                <img
                  src={book.imageLinks.thumbnail}
                  alt={book.title}
                  className="book-image"
                />
              )}
              <div className="book-details">
                <h2 className="book-title">{book.title}</h2>
                <p className="book-note">
                  感想{book.note || "感想はありません"}
                </p>
              </div>
            </>
          </div>
        ))}
      </div>
    </div>
  );
};
