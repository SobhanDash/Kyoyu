const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const User = require("../models/User");
const Post = require("../models/Post");
const fetchUser = require("../middleware/fetchuser");

// ROUTE-1: Get all the posts for the feed using: GET "/api/posts/getposts". Login required
router.get("/getposts", fetchUser, async (req, res) => {
  let success = false;
  const defaultposts = [
    {
      id: 1,
      image:
        "https://pixabay.com/photos/road-forest-fall-path-trail-trees-1072821/",
      caption: "Beautiful forest road",
    },
    {
      id: 2,
      image:
        "https://pixabay.com/photos/avenue-trees-path-sunbeams-sunrays-815297/",
      caption: "Amazing Sunbeams",
    },
    {
      id: 3,
      image:
        "https://pixabay.com/photos/lake-mountain-trees-forest-nature-6632026/",
      caption: "Soothing moutain view",
    },
    {
      id: 4,
      image:
        "https://pixabay.com/photos/polynesia-french-polynesia-tahiti-3021072/",
      caption: "Beautiful beach site",
    },
    {
      id: 5,
      image:
        "https://pixabay.com/photos/ice-cream-snow-iceland-plateau-2817112/",
      caption: "Beauty of the iceland",
    },
  ];
  try {
    const posts = await Post.find({ user: req.user.id });
    const user = await User.find({ _id: req.user.id });
    if (posts.length === 0) {
      success = true;
      return res.json({ success, defaultposts });
    } else {
      let visiblePosts = defaultposts.concat(posts);
      console.log(visiblePosts);
      success = true;
      return res.json({ success, visiblePosts });
    }
  } catch (err) {
    success = false;
    console.log("Error in getposts route:", err);
    res.send({ success, error: `Internal Server Error`, status: 500 });
  }
});

// ROUTE-2: Get all posts of the user using: GET "/api/posts/fetchallposts". Require Login
router.get("/fetchallposts", fetchUser, async (req, res) => {
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
    console.log("Error in fetchallposts route:", err);
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
      req.param.id,
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
      res.send({ success, error: "Not Found", status: 404 });
    }
    if (post.user.toString() !== req.user.id) {
      success = false;
      return res.send({ success, error: "Not Allowed", status: 401 });
    }
    post = await Post.findByIdAndDelete(req.params.id);
    const user = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { $pull: { posts: req.params.id } }
    );
    success = true;
    return res.json({ success, post, status: 200 });
  } catch (err) {
    success = false;
    console.log("Error in deletepost route:", err);
    res.send({ success, error: `Internal Server Error`, status: 500 });
  }
});

module.exports = router;
