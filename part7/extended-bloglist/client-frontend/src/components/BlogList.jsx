import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { likeBlog } from '../reducers/blogReducer';
import { removeBlog } from '../reducers/blogReducer';

const BlogList = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user;
  });

  const [blogVisibility, setBlogVisibility] = useState('View');

  const toggleVisibility = () => {
    setBlogVisibility((prevVisibility) =>
      prevVisibility === 'View' ? 'Hide' : 'View',
    );
  };

  //delete blog
  const blogRemoval = (id) => {
    dispatch(removeBlog(id));
  };

  //updates likes
  const like = (blog) => {
    const newObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    const id = blog.id;

    dispatch(likeBlog(id, newObject));
  };

  const blogs = useSelector((state) => {
    return state.blogs;
  });

  return (
    <div>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id} className="blog-text">
            <span className="blog-title">{blog.title}</span>{' '}
            <span className="blog-author">{blog.author}</span>{' '}
            <button onClick={toggleVisibility}>{blogVisibility}</button>
            {blogVisibility === 'Hide' && (
              <div>
                <div>{blog.url}</div>
                <div>
                  likes {blog.likes}{' '}
                  <button className="like-btn" onClick={() => like(blog)}>
                    like
                  </button>
                </div>
                <div>{blog.user.username}</div>

                {user.name === blog.user.name && (
                  <button
                    className="rm-btn"
                    onClick={() => {
                      if (
                        window.confirm(`Remove ${blog.title} by ${blog.author}`)
                      ) {
                        blogRemoval(blog.id);
                      }
                    }}
                  >
                    remove
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default BlogList;
