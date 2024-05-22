import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../styles.css";

export const SearchBooks = () => {
  //本の情報を取得
  const [searchQuery, setSearchQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  //searchQueryが変更された時にconsoleで変更を確認できる
  useEffect(() => {
    console.log("searchQuery updated:", searchQuery);
  }, [searchQuery]);

  //変更をsearchQueryに設定する
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  //検索内容をAPIからとってくる
  const search = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`,
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
      <h1>本の検索</h1>
      <div className="bookName">
        <input
          className="searchtitle"
          placeholder="登録する本を入力"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button onClick={search} className="searchbutton">
          検索
        </button>
      </div>
      <ul>
        {searchResults.map((book) => (
          <li key={book.id}>
            <Link to={`/book/${book.id}`} state={{ bookData: book }}>
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
      <Link to={"/"}>
        <button>ホームに戻る</button>
      </Link>
    </div>
  );
};
