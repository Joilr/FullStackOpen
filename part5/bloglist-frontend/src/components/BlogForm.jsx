import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: '', user: { username: '' } })

  const addBlog = (event) => {
    event.preventDefault()

    createBlog ({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })

    setNewBlog({ title: '', author: '', url: '', likes: '', user: { username: '' } })
  }

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
          value={newBlog.title}
          onChange={(event) => setNewBlog({ ...newBlog, title: event.target.value })}
        />
      </div>
      <div>
        author:
        <input
          value={newBlog.author}
          onChange={(event) => setNewBlog({ ...newBlog, author: event.target.value })}
        />
      </div>
      <div>
        url:
        <input
          value={newBlog.url}
          onChange={(event) => setNewBlog({ ...newBlog, url: event.target.value })}
        />
      </div>
      <div>
        likes:
        <input
          value={newBlog.likes}
          onChange={(event) => setNewBlog({ ...newBlog, likes: event.target.value })}
        />
      </div>
      <div>
        username:
        <input
          value={newBlog.user.username}
          onChange={(event) => setNewBlog({ ...newBlog, user: { ...newBlog.user, username: event.target.value } })}
        />
      </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm
