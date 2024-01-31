import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { removeBlog, likeBlog, commentBlog } from '../reducers/blogReducer';
import { useSelector, useDispatch } from 'react-redux';

const UsersList = () => {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));

  const user = useSelector((state) => {
    return state.user;
  });

  //add comment
  const addComment = (event) => {
    event.preventDefault();
    dispatch(commentBlog(blog.id, comment));
    setComment(''); // Clear the input field after submitting
  };

  //delete blog
  const blogRemoval = (id) => {
    dispatch(removeBlog(id));
  };

  //updates likes
  const like = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    dispatch(likeBlog(blog.id, updatedBlog));
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  const commentsTexts = blog.comments
    ? blog.comments.map((comment) => comment.text)
    : [];

  return (
    <div>
      <h1>{blog.title}</h1>
      <h2>{blog.url}</h2>
      <div>
        <span>
          <span>{blog.likes} likes</span>{' '}
          <button className="like-btn" onClick={() => like(blog)}>
            like
          </button>
        </span>
      </div>
      <h2>added by {user.username}</h2>
      <h2>comments</h2>

      <ul>
        {commentsTexts.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
      <form onSubmit={addComment}>
        <input
          type="text"
          id="comment-input"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button className="comment-btn" type="submit">
          add comment
        </button>
      </form>
      <button
        className="rm-btn"
        onClick={() => {
          if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
            blogRemoval(blog.id);
          }
        }}
      >
        remove
      </button>
    </div>
  );
};

export default UsersList;
