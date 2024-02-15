import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/Login";
import Notify from "./components/Notify";
import { useQuery, useApolloClient } from "@apollo/client";
import { ALL_BOOKS, ALL_AUTHORS } from "./components/queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const allBooks = useQuery(ALL_BOOKS);
  const allAuthors = useQuery(ALL_AUTHORS);
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  if (allBooks.loading || allAuthors.loading) {
    return <div>loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </>
    );
  }

  return (
    <div>
      <div>
        <button onClick={logout}>logout</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors allAuthors={allAuthors} />

      <Books />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
