// routes/comments.js
import express from 'express';
const router = express.Router();
import CommentModel from "../Models/CommentModel.js"; // Adjust the path as necessary
import Users from "../Models/UserModel.js"; // Adjust the path as necessary
import mongoose from 'mongoose';

// POST: Create a new comment
router.post('/', async (req, res) => {
  try {
    const { userId, postId, text } = req.body;
    const comment = new CommentModel({ userId, postId, text });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// GET: Retrieve comments for a post
router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await CommentModel.find({ postId: req.params.postId }).populate('userId');
    res.json(comments);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;