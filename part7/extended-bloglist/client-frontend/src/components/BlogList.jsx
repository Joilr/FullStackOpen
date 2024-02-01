import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div className="p-5">
      <div>
        <table>
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Title</th>
              <th className="px-4 py-2 text-left text-gray-600">Author</th>
              <th className="px-4 py-2 text-left text-gray-600">Likes</th>
            </tr>
          </thead>
          <tbody>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <tr key={blog.id} className="border-b">
                  <td className="px-4 py-2">
                    <Link
                      to={`/blogs/${blog.id}`}
                      className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
                    >
                      {blog.title}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-gray-600">{blog.author}</td>
                  <td className="px-4 py-2 text-gray-600">{blog.likes}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogList;
