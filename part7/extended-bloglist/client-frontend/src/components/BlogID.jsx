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
    <div className="mx-auto p-5">
      <h1 className="text-2xl font-bold text-gray-900">{blog.title}</h1>
      <h2 className="text-xl text-gray-800">{blog.url}</h2>
      <div className="my-3">
        <span>
          <span className="text-gray-700">{blog.likes} likes</span>
          <button
            className="like-btn ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
            onClick={() => like(blog)}
          >
            like
          </button>
        </span>
      </div>
      <h2 className="text-lg text-gray-700">added by {user.username}</h2>
      <h2 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
        comments
      </h2>

      <ul className="list-disc pl-5">
        {commentsTexts.map((text, index) => (
          <li key={index} className="text-gray-600">
            {text}
          </li>
        ))}
      </ul>
      <form onSubmit={addComment} className="mt-4">
        <input
          type="text"
          id="comment-input"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          className="border border-gray-300 rounded py-2 px-4 mr-2"
        />
        <button
          className="comment-btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          add comment
        </button>
      </form>
      <button
        className="rm-btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
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
