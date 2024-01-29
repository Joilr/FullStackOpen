import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const BlogList = () => {
  const blogs = useSelector((state) => {
    return state.blogs;
  });

  return (
    <div>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id} className="blog-text">
            <span className="blog-title">
              {' '}
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </span>{' '}
            <span className="blog-author">{blog.author}</span>{' '}
          </div>
        ))}
    </div>
  );
};

export default BlogList;
