import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import "./../styles.css";

export const BookDetails = () => {
  const [note, setNote] = useState("");
  const [book, setBook] = useState(null);
  const { bookId } = useParams();
  const history = useHistory();

  // const location = useLocation();
  // const bookDataFromlocation = location.state ? location.state.bookData : null;

  // if (!bookDataFromlocation) {
  //   return <div>Error: データがありません</div>;
  // }

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${bookId}`,
        );
        const data = await response.json();
        setBook(data.volumeInfo);
        // console.log(data);
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
    localStorage.setItem(`book_${bookId}_note`, note);
    console.log("本を本棚に追加しました", note);
    //取得した本の内容、感想をステートとして渡す
    history.push(`/MyBooksShelf/${bookId}`, {
      bookData: book,
      note: note,
    });
  };
  console.log(bookId);

  if (!book) {
    return <div>Loading...</div>;
  }
  const sentents = book.description.split("<br>");
  return (
    <div>
      <h1>本の登録</h1>
      <div>
        <strong>{book.title}</strong>
        <br />
        {book.author && <span>Author: {book.author}</span>}
        <br />
        <img src={book.imageLinks.smallThumbnail} alt={book.title} />
        {sentents.map((s, index) => (
          <p key={index}>{s}</p>
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            className="textarea"
            placeholder="感想を記入してください"
            value={note}
            onChange={handleNoteChange}
          ></textarea>
          <button onClick={handleAddToShelf}>感想を保存</button>
        </form>
      </div>
    </div>
  );
};
