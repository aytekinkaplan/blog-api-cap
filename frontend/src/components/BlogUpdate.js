import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function BlogUpdate() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/blogs/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.data.title);
        setContent(data.data.content);
      })
      .catch((error) => console.error("Error fetching blog:", error));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`http://localhost:8000/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });
    navigate("/");
  };

  return (
    <div>
      <h2>Update Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default BlogUpdate;
