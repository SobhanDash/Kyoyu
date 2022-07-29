const express = require("express");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

const router = express.Router();

//ROUTE-1: Fetch all comments using GET "/api/comments/". Login Required.
router.get("/", fetchUser, async (req, res) => {
  let success = false;
  try {
    let comments = await Comment.find()
      .populate("user", "_id name username about")
      .populate("post", "_id");

    success = true;
    return res.json({ success, comments, status: 200 });
  } catch (error) {
    success = false;
    console.log(`Error in fetching all comments: ${error.message}`);
    return res.json({ success, error: error.message, status: 500 });
  }
});

//ROUTE-2: Add a comment using POST "/api/comments/addcomment/:postId". Login Required.
router.post(
  "/addcomment/:postId",
  fetchUser,
  [
    body("comment", "You cannot post an empty comment")
      .replace(/\s/g, "")
      .trim()
      .isLength({ min: 1 }),
  ],
  async (req, res) => {
    let success = false;
    const { comment } = req.body;
    const userId = req.user.id;
    const postId = req.params.postId;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.json({ success, error: errors.array()[0].msg, status: 400 });
    }

    try {
      let user = await User.findById(userId);
      if (!user) {
        success = false;
        return res.json({ success, error: "User not found", status: 404 });
      }

      let post = await Post.findById(postId);
      if (!post) {
        success = false;
        return res.json({ success, error: "Post not found", status: 404 });
      }

      let mycomment = await Comment.create({
        comment: comment,
        post: post,
        user: user,
      });

      const comments = await Comment.find()
        .populate("user", "_id name username about")
        .populate("post", "_id");

      post = await Post.findByIdAndUpdate(
        postId,
        { $push: { comments: mycomment } },
        { new: true }
      );

      const posts = await Post.find()
        .populate("user", "_id name username about")
        .populate("comments", "_id comment likes user");

      success = true;
      return res.json({ success, posts, comments, status: 200 });
    } catch (error) {
      success = false;
      console.log(`Error in adding a comment: ${error.message}`);
      return res.json({ success, error: error.message, status: 500 });
    }
  }
);

//ROUTE-3: Edit an existing comment using PUT "/api/comments/editcomment/:postId/:commentId". Login Required.
router.put(
  "/editcomment/:postId/:commentId",
  fetchUser,
  [
    body("comment", "You cannot post an empty comment")
      .replace(/\s/g, "")
      .trim()
      .isLength({ min: 1 }),
  ],
  async (req, res) => {
    let success = false;
    const { comment } = req.body;
    const userId = req.user.id;
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.json({ success, error: errors.array()[0].msg, status: 400 });
    }

    try {
      let user = await User.findById(userId);
      if (!user) {
        success = false;
        return res.json({ success, error: "User not found", status: 404 });
      }

      let post = await Post.findById(postId);
      if (!post) {
        success = false;
        return res.json({ success, error: "Post not found", status: 404 });
      }

      let mycomment = await Comment.findById(commentId);
      if (!mycomment) {
        success = false;
        return res.json({ success, error: "Comment not found", status: 404 });
      }

      mycomment = await Comment.findByIdAndUpdate(
        commentId,
        { comment: comment },
        { new: true }
      );

      const comments = await Comment.find()
        .populate("user", "_id name username about")
        .populate("post", "_id");

      success = true;
      return res.json({ success, post, comments, status: 200 });
    } catch (error) {
      success = false;
      console.log(`Error in editing a comment: ${error.message}`);
      return res.json({ success, error: error.message, status: 500 });
    }
  }
);

//ROUTE-4: Delete an existing comment using DELETE "/api/comments/deletecomment/:postId/:commentId". Login Required.
router.delete(
  "/deletecomment/:postId/:commentId",
  fetchUser,
  async (req, res) => {
    let success = false;
    const userId = req.user.id;
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    try {
      let user = await User.findById(userId);
      if (!user) {
        success = false;
        return res.json({ success, error: "User not found", status: 404 });
      }

      let post = await Post.findById(postId);
      if (!post) {
        success = false;
        return res.json({ success, error: "Post not found", status: 404 });
      }

      let comment = await Comment.findById(commentId);
      if (!comment) {
        success = false;
        return res.json({ success, error: "Comment not found", status: 404 });
      }

      post = await Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: comment } },
        { new: true }
      );

      comment = await Comment.findByIdAndDelete(commentId, { new: true });

      const comments = await Comment.find()
        .populate("user", "_id name username about")
        .populate("post", "_id");

      const posts = await Post.find()
        .populate("user", "_id name username about")
        .populate("comments", "_id comment likes user");

      success = true;
      return res.json({ success, posts, comments, status: 200 });
    } catch (error) {
      success = false;
      console.log(`Error in deleting a comment: ${error.message}`);
      return res.json({ success, error: error.message, status: 500 });
    }
  }
);

// ROUTE-5: Like a comment using PUT "/api/posts/likecomment/:commentId". Login required.
router.put("/likecomment/:commentId", fetchUser, async (req, res) => {
  let success = false;
  const userId = req.user.id;
  const commentId = req.params.commentId;

  try {
    let user = await User.findById(userId);
    if (!user) {
      success = false;
      return res.json({ success, error: "User not found!", status: 404 });
    }

    let comment = await Comment.findById(commentId);
    if (!comment) {
      success = false;
      return res.json({ success, error: "Comment not found", status: 404 });
    }

    comment = await Post.findByIdAndUpdate(
      commentId,
      { $push: { likes: user } },
      { new: true }
    );

    const comments = await Comment.find()
      .populate("user", "_id name username about")
      .populate("post", "_id");

    success = true;
    return res.json({ success, comments, status: 200 });
  } catch (error) {
    success = false;
    console.log(`Error in liking a comment: ${error.message}`);
    return res.json({ success, error: error.message, status: 500 });
  }
});

// ROUTE-6: Unlike a comment using PUT "/api/posts/unlikecomment/:commentId". Login required.
router.put("/unlikecomment/:commentId", fetchUser, async (req, res) => {
  let success = false;
  const userId = req.user.id;
  const postId = req.params.postId;
  const commentId = req.params.commentId;

  try {
    let user = await User.findById(userId);
    if (!user) {
      success = false;
      return res.json({ success, error: "User not found!", status: 404 });
    }

    let comment = await Comment.findById(commentId);
    if (!comment) {
      success = false;
      return res.json({ success, error: "Comment not found", status: 404 });
    }

    comment = await Post.findByIdAndUpdate(
      commentId,
      { $pull: { likes: user } },
      { new: true }
    );

    const comments = await Comment.find()
      .populate("user", "_id name username about")
      .populate("post", "_id");

    success = true;
    return res.json({ success, comments, status: 200 });
  } catch (error) {
    success = false;
    console.log(`Error in unliking a comment: ${error.message}`);
    return res.json({ success, error: error.message, status: 500 });
  }
});

//ROUTE-7: Fetch all comments of an existing post using GET "/api/comments/post/:id". Login Required.
router.get("/post/:id", fetchUser, async (req, res) => {
  let success = false;
  const postId = req.params.id;
  try {
    let comments = await Comment.find({ post: postId })
      .populate("user", "_id name username about")
      .populate("post", "_id");

    success = true;
    return res.json({ success, comments, status: 200 });
  } catch (error) {
    success = false;
    console.log(
      `Error in fetching all comments of an existing post: ${error.message}`
    );
    return res.json({ success, error: error.message, status: 500 });
  }
});

module.exports = router;
