import { useState } from "react";

const Books = ({ allBooks }) => {
  const [genre, setGenre] = useState("");
  const books = allBooks.data.allBooks;

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
          {books
            .filter((book) => genre === "" || book.genres.includes(genre))
            .map((book) => (
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
    </div>
  );
};

export default Books;
