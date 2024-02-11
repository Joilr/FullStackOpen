import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_AUTHORS } from "./components/queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const allBooks = useQuery(ALL_BOOKS);
  const allAuthors = useQuery(ALL_AUTHORS);

  if (allBooks.loading || allAuthors.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors show={page === "authors"} allAuthors={allAuthors} />

      <Books show={page === "books"} allBooks={allBooks} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
