const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Post = require("../models/Post");
const fetchUser = require("../middleware/fetchUser");

// ROUTE-1: Get all the posts for the feed using: GET "/api/posts/getposts". Login required
router.get("/getposts", fetchUser, async (req, res) => {
  let success = false;
  try {
    const posts = await Post.find()
      .populate("user", "_id username name about")
      .populate("comments", "_id comment likes post user")
      .sort("-createdAt");
    // console.log(posts);
    success = true;
    return res.json({ success, posts, status: 200 });
  } catch (err) {
    success = false;
    console.log("Error in getposts route:", err.message);
    return res.json({ success, error: err.message, status: 500 });
  }
});

// ROUTE-2: Get all posts of the user using: GET "/api/posts/getsubpost". Require Login
router.get("/getsubpost", fetchUser, async (req, res) => {
  let success = false;
  // const noPosts = "No posts to show";
  try {
    const posts = await Post.find({ user: req.user.id });
    // if (posts.length === 0) {
    //   success = true;
    //   return res.json({ success, noPosts, status: 200 });
    // } else {
    //   success = true;
    //   return res.json({ success, posts, status: 200 });
    // }
    return res.json({ success, posts, status: 200 });
  } catch (err) {
    success = false;
    console.log("Error in getsubpost route:", err.message);
    return res.json({ success, error: err.message, status: 500 });
  }
});

// ROUTE-3: Add a new post using: POST "/api/posts/addpost". Require Login
router.post(
  "/addpost",
  fetchUser,
  [body("image", "Enter a valid image").exists()],
  async (req, res) => {
    let success = false;
    try {
      const { image, caption } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        success = false;
        return res.json({
          success,
          errors: errors.array()[0].msg,
          status: 400,
        });
      }
      const post = new Post({
        image,
        caption,
        user: req.user.id,
      });
      const savedPost = await post.save();
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $push: { posts: savedPost } },
        { new: true }
      );

      const posts = await Post.find()
        .populate("user", "_id username name about")
        .populate("comments", "_id comment likes post user")
        .sort("-createdAt");

      success = true;
      res.json({ success, posts, savedPost, user, status: 200 });
    } catch (err) {
      success = false;
      console.log("Error in addposts route:", err);
      res.send({ success, error: err.message, status: 500 });
    }
  }
);

// ROUTE-4: Update an existing post using: PUT "/api/posts/updatepost". Require Login
router.put("/updatepost/:id", fetchUser, async (req, res) => {
  let success = false;
  try {
    const { caption } = req.body;
    let newPost = { caption: "" };
    if (caption) {
      newPost.caption = caption;
    }
    
    let post = await Post.findById(req.params.id);
    if (!post) {
      success = false;
      res.send({ success, error: "Not Found", status: 404 });
    }
    if (post.user.toString() !== req.user.id) {
      success = false;
      res.send({ success, error: "Not Allowed", status: 401 });
    }
     
    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: newPost },
      { new: true }
    );

    const posts = await Post.find()
      .populate("user", "_id username name about")
      .populate("comments", "_id comment likes post user")
      .sort("-createdAt");

    success = true;
    return res.json({ success, posts, post, status: 200 });
  } catch (err) {
    success = false;
    console.log("Error in updatepost route:", err);
    res.send({ success, error: `Internal Server Error`, status: 500 });
  }
});

// ROUTE-5: Delete an existing post using: DELETE "/api/posts/deletepost". Require Login
router.delete("/deletepost/:id", fetchUser, async (req, res) => {
  let success = false;
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      success = false;
      return res.send({ success, error: "Not Found", status: 404 });
    }

    if (post.user.toString() !== req.user.id.toString()) {
      success = false;
      return res.send({ success, error: "This is not allowed", status: 401 });
    }

    post = await Post.findByIdAndDelete(req.params.id, { new: true });
    const user = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { $pull: { posts: req.params.id } },
      { new: true }
    );

    const posts = await Post.find()
      .populate("user", "_id username name about")
      .populate("comments", "_id comment likes post user")
      .sort("-createdAt");

    success = true;
    return res.json({ success, user, posts, post, status: 200 });
  } catch (err) {
    success = false;
    console.log("Error in deletepost route:", err);
    return res.json({ success, error: `Internal Server Error`, status: 500 });
  }
});

// ROUTE-6: Like a existing post using: PUT "/api/posts/like". Require Login
router.put("/like/:id", fetchUser, async (req, res) => {
  let success = false;
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      success = false;
      return res.json({ success, error: "Post not Found", status: 404 });
    }
    if (post.likes.includes(req.user.id)) {
      success = false;
      return res.json({
        success,
        error: "A user can only like a particular post once!",
        status: 400,
      });
    }
    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $push: { likes: req.user.id } },
      { new: true }
    );

    const posts = await Post.find()
      .populate("user", "_id username name about")
      .populate("comments", "_id comment likes post user")
      .sort("-createdAt");

    success = true;
    return res.json({ success, posts, post, status: 200 });
  } catch (error) {
    success = false;
    console.log("Error in like route:", error.message);
    return res.json({ success, error: error.message, status: 500 });
  }
});

// ROUTE-7: Unlike a existing post using: PUT "/api/posts/unlike". Require Login
router.put("/unlike/:id", fetchUser, async (req, res) => {
  let success = false;
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      success = false;
      return res.json({ success, error: "Post not Found", status: 404 });
    }
    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user.id } },
      { new: true }
    );

    const posts = await Post.find()
      .populate("user", "_id username name about")
      .populate("comments", "_id comment likes post user")
      .sort("-createdAt");

    success = true;
    return res.json({ success, posts, post, status: 200 });
  } catch (error) {
    success = false;
    console.log("Error in unlike route:", error.message);
    return res.json({ success, error: error.message, status: 500 });
  }
});

// ROUTE-8: Get a particular post by id using: GET "/api/posts/posts/:id". Require Login
router.get("/:id", fetchUser, async (req, res) => {
  let success = false;
  try {
    const post = await Post.findById(req.params.id)
      .populate("user", "_id username name about")
      .populate("comments", "_id likes comment user")
      .sort("-createdAt");

    success = true;
    return res.json({ success, post, status: 200 });
  } catch (err) {
    success = false;
    console.log("Error in getpost route:", err.message);
    return res.json({ success, error: err.message, status: 500 });
  }
});

module.exports = router;
