const express = require('express');
const router = express.Router();
const BlogSchema = require('../models/blog');

router.post('/blog', async (req, res) => {
  try {
    const newBlog = new BlogSchema({
      title: req.body.title,
      content: req.body.content,
    });

    // Save the blog to the database
    const savedBlog = await newBlog.save();

    // Respond with the saved blog
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error("Error creating blog:", error);

    // Respond with an error message
    res.status(500).json({ message: "Error creating blog", error });
  }
});



router.delete('/blog/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await BlogSchema.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Error deleting post", error });
  }
});




router.get('/blog', async (req, res) => {
  try {
    const blogs = await BlogSchema.find(); // Fetch all blogs from the database
    res.status(200).json(blogs); // Respond with the list of blogs
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Error fetching blogs", error });
  }
});
module.exports = router;
