import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const SearchBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log("searchQuery updated:", searchQuery);
  }, [searchQuery]);

  const handleInputChange = (event) => {
    // console.log("event");
    setSearchQuery(event.target.value);
  };

  const search = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`
      );
      const data = await response.json();
      console.log(data);
      setSearchResults(data.items || []);
    } catch (error) {
      console.error("Error fatching data:", error);
    }
  };

  return (
    <div className="Search">
      <h1>BookMemory</h1>
      <input
        placeholder="登録する本を入力"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button onClick={search}>検索</button>
      <ul>
        {searchResults.map((book) => (
          <li key={book.id}>
            <Link to={`/book/${book.id}`}>
              <strong>{book.volumeInfo.title}</strong>
              {book.volumeInfo.authors && book.volumeInfo.authors.join(",")}
              <br />
              {book.volumeInfo.imageLinks && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
