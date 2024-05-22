import { Link } from "react-router-dom";
import "./../styles.css";

export const MenuTabs = () => {
  return (
    <div className="menu">
      <h1>Books Memory</h1>
      <div className="links">
        <Link to={"/"}></Link>
        <Link to={"/MyBooksShelf"}>本棚</Link>
        <Link to={"/SearchBooks"}>本の検索</Link>
      </div>
    </div>
  );
};
