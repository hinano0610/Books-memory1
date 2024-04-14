import React from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import { MenuTabs } from "./components/MenuTabs";
import { MyBooksShelf } from "./components/MyBooksShelf";
import { SearchBooks } from "./components/SearchBooks";
import { BookDetails } from "./components/BookDetails";
import "./styles.css";
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Link to={"/"}>メニュー</Link>
        <br />
        <Link to={"/MyBooksShelf"}>My本棚</Link>
        <br />
        <Link to={"/SearchBooks"}>本の検索</Link>
        <br />
      </div>
      <Switch>
        <Route exact path="/">
          <MenuTabs />
        </Route>
        <Route path="/MyBooksShelf">
          <MyBooksShelf />
        </Route>
        <Route path="/SearchBooks">
          <SearchBooks />
        </Route>
        <Route path={"/book/${book.id}"} />
        <BookDetails />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
