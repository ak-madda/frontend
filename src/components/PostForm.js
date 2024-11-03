import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const PostForm = ({ post = {} }) => {
  const [title, setTitle] = useState(post.title || "");
  const [content, setContent] = useState(post.content || "");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (post._id) {
        // Update existing post
        await api.put(
          `/api/posts/${post._id}`,
          { title, content },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        // Create new post
        await api.post(
          "/api/posts",
          { title, content },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{post._id ? "Edit Post" : "Create Post"}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit">{post._id ? "Update Post" : "Create Post"}</button>
    </form>
  );
};

export default PostForm;
