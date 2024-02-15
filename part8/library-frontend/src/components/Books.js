import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS_BY_GENRE, GET_MY_FAVORITE_GENRE } from "./queries";

const Books = () => {
  const [genre, setGenre] = useState("");

  const {
    data: booksData,
    loading: booksLoading,
    error: booksError,
  } = useQuery(GET_BOOKS_BY_GENRE, {
    variables: { genre: genre || null },
  });

  const {
    data: favoriteGenreData,
    loading: favoriteGenreLoading,
    error: favoriteGenreError,
  } = useQuery(GET_MY_FAVORITE_GENRE);

  if (booksLoading || favoriteGenreLoading) return <p>Loading...</p>;
  if (booksError || favoriteGenreError) return <p>Error</p>;

  // Extract books array from the query result
  const books = booksData.allBooks;

  const setToFavoriteGenre = () => {
    if (favoriteGenreData.me.favorite_genre) {
      setGenre(favoriteGenreData.me.favorite_genre);
    }
  };

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>genres</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.genres.join(", ")}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        filter by genre:
        <select value={genre} onChange={({ target }) => setGenre(target.value)}>
          <option value="">Show All</option>
          {[...new Set(books.flatMap((book) => book.genres))].map(
            (uniqueGenre) => (
              <option key={uniqueGenre} value={uniqueGenre}>
                {uniqueGenre}
              </option>
            )
          )}
        </select>
      </div>
      <button onClick={setToFavoriteGenre}>filter by favorite genre</button>
    </div>
  );
};

export default Books;
