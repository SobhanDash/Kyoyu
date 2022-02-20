const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const fetchUser = require("../middleware/fetchuser");

// ROUTE-1: Get all the comments for the post using: GET "/api/post/getcomments". Login required
router.get("/getcomments", fetchUser, async (req, res) => {
  let success = false;
  try {
    const comments = await Comment.find({ user: req.user.id });
    if (comments) {
      success = true;
      res.send({ success, comments });
    }
  } catch (err) {
    success = false;
    console.log("Error in getcomments route:", err);
    res.send({ success, error: `Internal Server Error`, status: 500 });
  }
});

// ROUTE-2: Add a new comment using: POST "/api/post/addcomment". Require Login
router.post(
  "/addcomment",
  fetchUser,
  [body("body", "Enter valid comment").isLength({ min: 1000 })],
  async (req, res) => {
    let success = false;
    try {
      const { body, userId, postId, parentCommentId } = req.body;
      const errors = validateResult(req);
      if (!errors.isEmpty()) {
        success = false;
        return res.json({ success, errors: errors.array(), status: 400 });
      }
      if (parentCommentId) {
        const comment = await Comment.findOne({ _id: parentCommentId });
        const reply = new Comment({
          body,
          uer: userId,
          parentComment: parentCommentId,
          level: 2,
        });
        await reply.save();
        comment.replies.push(reply._id);
        const savedComment = await comment.save();
        success = true;
        return res.json({ success, savedComment, status: 200 });
      } else {
        const post = await Post.findOne({ _id: postId });
        const comment = new Comment({
          body,
          user: userId,
          level: 1,
        });
        const savedComment = await comment.save();
        post.comments.push(comment._id);
        await post.save();
        success = true;
        return res.json({ success, savedComment, status: 200 });
      }
    } catch (err) {
      success = false;
      console.log("Error in addcomment route:", err);
      res.send({ success, error: `Internal Server Error`, status: 500 });
    }
  }
);

// ROUTE-3: Update an existing comment using: PUT "/api/post/updatecomment". Require Login
router.put("/updatecomment/:id", fetchUser, async (req, res) => {
  let success = false;
  try {
    const { body, userId, postId, parentCommentId } = req.body;
    const errors = validateResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.json({ success, errors: errors.array(), status: 400 });
    }
    const { body } = req.body;
    let updatedComment = { body: "" };
    if (body) {
      updatedComment.body = body;
    }
    let comment = await Comment.findById(req.params.id);
    if (!comment) {
      success = false;
      return res.send({ success, error: "Not Found", status: 404 });
    }
    if (comment.user.toString() !== req.user.id) {
      success = false;
      res.send({ success, error: "Not Allowed", status: 401 });
    }
    com = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $set: updatedComment,
      },
      { new: true }
    );
    success = true;
    return res.json({ success, comment, status: 200 });
  } catch (err) {
    success = false;
    console.log("Error in updatecomment route:", err);
    res.send({ success, error: `Internal Server Error`, status: 500 });
  }
});
// ROUTE-4: Delete an existing comment using: DELETE "/api/post/deletecomment". Require Login
router.delete("/deletecomment/:id", fetchUser, async (req, res) => {
  let success = false;
  try {
    const { commentId, postId, parentCommentId } = req.body;

    if (parentCommentId) {
      const parentComment = await Comment.findOne({ _id: parentCommentId });
      parentComment.replies = parentComment.replies.filter(
        (id) => id.valueOf() !== commentId
      );
      const comment = await Comment.findOne({
        _id: commentId,
      });
      await Comment.deleteOne({ _id: commentId });
      await parentComment.save();
      success = true;
      return res.json({ success, parentComment, status: 200 });
    } else {
      const comment = await Comment.findOne({ _id: commentId });
      const post = await Post.findOne({ _id: postId });
      post.comments = post.comments.filter((id) => id.valueOf() !== commentId);
      post.save();
      await Comment.deleteOne({ _id: commentId });
      success = true;
      return res.json({ success, comment, status: 200 });
    }
  } catch (err) {
    success = false;
    console.log("Error in deletecomment route:", err);
    res.send({ success, error: `Internal Server Error`, status: 500 });
  }
});

module.exports = router;
