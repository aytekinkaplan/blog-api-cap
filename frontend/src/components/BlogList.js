import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BlogList() {
  const [blogs, setBlogs] = useState([]); // Başlangıç değeri olarak boş bir dizi ayarlayın

  useEffect(() => {
    fetch("http://localhost:8000/blogs")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          setBlogs(data.data); // Veriyi blogs state'ine ayarlayın
        } else {
          console.error("Blog data is missing");
        }
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  if (!blogs || blogs.length === 0) {
    return <div>No blogs found</div>; // Veriler yoksa uygun bir mesaj göster
  }

  return (
    <div>
      <h2>Blog List</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>
            <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/create">Create New Blog</Link>
    </div>
  );
}

export default BlogList;
