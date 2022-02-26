const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Post = require("../models/Post");
const fetchUser = require("../middleware/fetchuser");

// ROUTE-1: Get all the posts for the feed using: GET "/api/posts/getposts". Login required
router.get("/getposts", fetchUser, async (req, res) => {
  let success = false;
  try {
    Post.find()
      .populate("user", "_id username name about")
      .populate("comments.user", "_id username name")
      .sort("-createdAt")
      .then((posts) => {
        sucess = true;
        res.json({ success, posts });
      });
  } catch (err) {
    success = false;
    console.log("Error in getposts route:", err);
    res.send({ success, error: `Internal Server Error`, status: 500 });
  }
});

// ROUTE-2: Get all posts of the user using: GET "/api/posts/getsubpost". Require Login
router.get("/getsubpost", fetchUser, async (req, res) => {
  let success = false;
  const noPosts = "No posts to show";
  try {
    const posts = await Post.find({ user: req.user.id });
    if (posts.length === 0) {
      success = true;
      res.json({ success, noPosts });
    } else {
      success = true;
      res.json({ success, posts });
    }
  } catch (err) {
    success = false;
    console.log("Error in getsubpost route:", err);
    res.send({ success, error: "Internal Server Error", status: 500 });
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
        return res.json({ success, errors: errors.array(), status: 400 });
      }
      const post = new Post({
        image,
        caption,
        user: req.user.id,
      });
      const savedPost = await post.save();
      const user = await User.findByIdAndUpdate(
        { _id: req.user.id },
        { $push: { posts: savedPost } }
      );
      success = true;
      res.json({ success, savedPost, status: 200 });
    } catch (err) {
      success = false;
      console.log("Error in addposts route:", err);
      res.send({ success, error: err.message, status: 500 });
    }
  }
);

// ROUTE-4: Update an existing note using: PUT "/api/posts/updatepost". Require Login
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
    success = true;
    return res.json({ success, post, status: 200 });
  } catch (err) {
    success = false;
    console.log("Error in updatepost route:", err);
    res.send({ success, error: `Internal Server Error`, status: 500 });
  }
});

// ROUTE-5: Delete an existing note using: DELETE "/api/posts/deletepost". Require Login
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

    post = await Post.findByIdAndDelete(req.params.id);
    const user = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { $pull: { posts: req.params.id } }
    );
    success = true;
    res.json({ success, post, status: 200 });
  } catch (err) {
    success = false;
    console.log("Error in deletepost route:", err);
    res.send({ success, error: `Internal Server Error`, status: 500 });
  }
});

router.put("/like", fetchUser, (req, res) => {
  let success = false;
  Post.findByIdAndUpdate(
    req.body.postid,
    {
      $push: { likes: req.user.id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      console.log("Error in like route:", err);
      return res.json({ success, error: err, status: 422 });
    } else {
      success = true;
      res.json({ success, result, status: 200 });
    }
  });
});
router.put("/unlike", fetchUser, (req, res) => {
  let success = false;
  Post.findByIdAndUpdate(
    req.body.postid,
    {
      $pull: { likes: req.user.id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      console.log("Error in unlike route:", err);
      return res.json({ success, error: err, status: 422 });
    } else {
      success = true;
      res.json({ success, result, status: 200 });
    }
  });
});

router.put("/comment", fetchUser, (req, res) => {
  let success = false;
  const comm = {
    text: req.body.text,
    user: req.user.id,
  };
  console.log(req.user.id);
  const p = Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comm },
    },
    {
      new: true,
    }
  )
  .populate("comments.user", "_id username name")
  .populate("user", "_id username name")
  .exec((err, result) => {
    if (err) {
      console.log("Error in comment route:", err);
      return res.json({ success, error: err, status: 422 });
    } else {
      success = true;
      console.log(result);
      res.json({ success, result, status: 200 });
    }
  });
});


module.exports = router;
