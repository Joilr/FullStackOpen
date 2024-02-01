import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';

const BlogForm = () => {
  const dispatch = useDispatch();
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const addBlog = (event) => {
    event.preventDefault();

    dispatch(
      createBlog({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      }),
    );

    setNewBlog({ title: '', author: '', url: '' });
  };

  return (
    <div className="max-w-md p-6">
      <form onSubmit={addBlog} className="space-y-4">
        <div>
          <label
            htmlFor="title-input"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title:
          </label>
          <input
            type="text"
            value={newBlog.title}
            onChange={(event) =>
              setNewBlog({ ...newBlog, title: event.target.value })
            }
            id="title-input"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label
            htmlFor="author-input"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Author:
          </label>
          <input
            type="text"
            value={newBlog.author}
            onChange={(event) =>
              setNewBlog({ ...newBlog, author: event.target.value })
            }
            id="author-input"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label
            htmlFor="url-input"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            URL:
          </label>
          <input
            type="text"
            value={newBlog.url}
            onChange={(event) =>
              setNewBlog({ ...newBlog, url: event.target.value })
            }
            id="url-input"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="create-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
