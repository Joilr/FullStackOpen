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
    setComment('');
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
    <div className="p-5 mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">{blog.title}</h1>
      <h2 className="text-xl text-gray-800">{blog.url}</h2>
      <div className="my-3">
        <span>
          <span className="text-gray-700">{blog.likes} likes</span>
          <button
            className="px-3 py-1 ml-3 font-bold text-white bg-blue-500 rounded like-btn hover:bg-blue-700"
            onClick={() => like(blog)}
          >
            like
          </button>
        </span>
      </div>
      <h2 className="text-lg text-gray-700">added by {user.username}</h2>
      <h2 className="mt-4 mb-2 text-lg font-semibold text-gray-800">
        comments
      </h2>

      <ul className="pl-5 list-disc">
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
          className="px-4 py-2 mr-2 border border-gray-300 rounded"
        />
        <button
          className="px-4 py-2 font-bold text-white bg-green-500 rounded comment-btn hover:bg-green-700"
          type="submit"
        >
          add comment
        </button>
      </form>
      <button
        className="px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded rm-btn hover:bg-red-700"
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
