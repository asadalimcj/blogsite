import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import Button from "./components/Button";
import axios from "axios";

const App = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from backend on component mount (optional)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blog");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Function to submit form data to the backend
  const handleFormSubmit = async (formData) => {
    try {
      const response = await axios.post("http://localhost:5000/api/blog", formData);

      const newPost = response.data;
      alert("Added new post successfully");
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  // Function to delete a post
  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/blog/${postId}`);
      alert("Post deleted successfully");

      // Update posts state by removing the deleted post
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">
          Blog Management System
        </h1>

        <div className="max-w-lg mx-auto mb-8">
          <Form onSubmit={handleFormSubmit} />
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Posts</h2>
          {posts.length === 0 ? (
            <p className="text-gray-600">
              No posts yet. Add a new post using the form above!
            </p>
          ) : (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li
                  key={post._id}
                  className="bg-white p-4 shadow-md rounded-md border border-gray-200"
                >
                  <h3 className="text-lg font-bold text-gray-800">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 mt-2">{post.content}</p>
                  <div className="mt-4">
                    <Button
                      label="Delete"
                      className="bg-red-500 hover:bg-red-700"
                      onClick={() => handleDeletePost(post._id)} // Call delete function
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
