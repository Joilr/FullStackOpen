import { EDIT_AUTHOR, ALL_AUTHORS } from "./queries";
import { useMutation } from "@apollo/client";
import { useState } from "react";

const Authors = ({ allAuthors }) => {
  const authors = allAuthors.data.allAuthors;
  const [author, setAuthor] = useState("Robert Martin");
  const [born, setBorn] = useState("");

  const [changeAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    try {
      await changeAuthor({
        variables: {
          name: author,
          setBornTo: parseInt(born),
        },
      });

      setAuthor("Robert Martin");
      setBorn("");
    } catch (error) {
      console.error("Error changing born year:", error);
    }
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={submit}>
        <div>
          Set birth-year:
          <select
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          >
            {authors.map((a) => (
              <option key={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        Born:
        <input value={born} onChange={({ target }) => setBorn(target.value)} />
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
