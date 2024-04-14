import React, { createContext, useState } from "react";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [apiData, setApiData] = useState(null);

  const saveApiData = (data) => {
    setApiData(data);
  };

  return (
    <BookContext.Provider value={{ ...apiData, saveApiData }}>
      {children}
    </BookContext.Provider>
  );
};
