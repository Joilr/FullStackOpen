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
    <div>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            value={newBlog.title}
            onChange={(event) =>
              setNewBlog({ ...newBlog, title: event.target.value })
            }
            id="title-input"
          />
        </div>
        <div>
          author:
          <input
            value={newBlog.author}
            onChange={(event) =>
              setNewBlog({ ...newBlog, author: event.target.value })
            }
            id="author-input"
          />
        </div>
        <div>
          url:
          <input
            value={newBlog.url}
            onChange={(event) =>
              setNewBlog({ ...newBlog, url: event.target.value })
            }
            id="url-input"
          />
        </div>
        <button className="create-btn" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
