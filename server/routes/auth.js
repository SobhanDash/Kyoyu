// Route for user authentication and user details
const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const secret = JWT_SECRET;
const router = express.Router();

const User = require("../models/User");
const fetchUser = require("../middleware/fetchUser");

// ROUTE-1: Register a user using: POST "/api/auth/register". Doesn't Require Login
router.post(
  "/register",
  [
    body("username", "Enter a valid username").isLength({ min: 5 }),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password")
      .isLength({ min: 8 })
      .matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      console.log(
        `Error in register route: Body is empty ${errors.array()[0].msg}`
      );
      return res.json({ success, errors: errors.array()[0].msg, status: 400 });
    }
    try {
      let userEmail = await User.findOne({ email: req.body.email });
      if (userEmail) {
        success = false;
        return res.json({
          success,
          error: "Email already taken",
          status: 400,
        });
      }

      let userUsername = await User.findOne({ username: req.body.username });
      if (userUsername) {
        success = false;
        return res.json({
          success,
          error: "Username is already taken",
          status: 400,
        });
      }

      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);
      let user = await User.create({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, secret);
      success = true;
      return res.json({ success, authToken, status: 200 });
    } catch (err) {
      success = false;
      console.log(`Error in registering user: ${err.message}`);
      return res.json({
        success,
        error: err.message,
        status: 500,
      });
    }
  }
);

// ROUTE-2: Login a user using: POST "/api/auth/login". Doesn't Require Login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      success = false;
      console.log(
        `Error in login route: Body is empty ${errors.array()[0].msg}`
      );
      return res.json({ success, error: errors.array()[0].msg, status: 400 });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.json({
          success,
          error: "No account is associated to this email",
          status: 400,
        });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.json({
          success,
          error: "Incorrect Password",
          status: 400,
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, secret);
      success = true;
      return res.json({ success, authToken, status: 200 });
    } catch (err) {
      success = false;
      console.log(`Error in login route: ${err.message}`);
      return res.json({ success, error: err.message, status: 500 });
    }
  }
);

// ROUTE-3: Get logged-in user details using: POST "/api/auth/profile". Require Login
router.get("/profile", fetchUser, async (req, res) => {
  let success = false;
  try {
    const userId = req.user.id;
    const user = await User.findById(userId)
      .populate("posts", "_id image caption likes comments")
      .populate("followers", "_id name username about")
      .populate("following", "_id name username about");

    success = true;
    return res.json({ success, user, status: 200 });
  } catch (err) {
    success = false;
    console.log(`Error in profile route: ${err.message}`);
    return res.json({ success, error: err.message, status: 500 });
  }
});

// ROUTE-4: Follow a user account using PUT "/api/auth/follow/:id". Login required
router.put("/follow/:id", fetchUser, async (req, res) => {
  let success = false;
  const userId = req.user.id;
  const followeduserId = req.params.id;

  try {
    let user = await User.findById(userId);
    if (!user) {
      success = false;
      return res.json({ success, error: "User not found!", status: 404 });
    }

    let followeduser = await User.findById(followeduserId);
    if (!followeduser) {
      success = false;
      return res.json({ success, error: "User not found!", status: 404 });
    }

    if (!user.following.includes(followeduser._id)) {
      user = await User.findByIdAndUpdate(
        userId,
        { $push: { following: followeduser } },
        { new: true }
      );
    } else {
      success = false;
      return res.json({
        success,
        error: "You are already following this user!",
        status: 400,
      });
    }

    if (!followeduser.followers.includes(user._id)) {
      followeduser = await User.findByIdAndUpdate(
        followeduserId,
        { $push: { followers: user } },
        { new: true }
      );
    } else {
      success = false;
      return res.json({
        success,
        error: "You are already following this user!",
        status: 400,
      });
    }

    user = await User.findById(userId)
      .populate("followers", "_id name username about")
      .populate("following", "_id name username about")
      .populate("posts", "_id images caption");

    success = true;
    return res.json({ success, user, status: 200 });
  } catch (error) {
    success = false;
    console.log(`Error in follow/:id route: ${error.message}`);
    return res.json({ success, error: error.message, status: 500 });
  }
});

// ROUTE-5: Unfollow a user account using PUT "/api/auth/unfollow/:id". Login required
router.put("/unfollow/:id", fetchUser, async (req, res) => {
  let success = false;
  const userId = req.user.id;
  const followeduserId = req.params.id;

  try {
    let user = await User.findById(userId);
    if (!user) {
      success = false;
      return res.json({ success, error: "User not found!", status: 404 });
    }

    let followeduser = await User.findById(followeduserId);
    if (!followeduser) {
      success = false;
      return res.json({ success, error: "User not found!", status: 404 });
    }

    if (user.following.includes(followeduser._id)) {
      user = await User.findByIdAndUpdate(
        userId,
        { $pull: { following: followeduser._id } },
        { new: true }
      );
    } else {
      success = false;
      return res.json({
        success,
        error: "You are not following this user!",
        status: 400,
      });
    }

    if (followeduser.followers.includes(user._id)) {
      followeduser = await User.findByIdAndUpdate(
        followeduserId,
        { $pull: { followers: user._id } },
        { new: true }
      );
    } else {
      success = false;
      return res.json({
        success,
        error: "You are not following this user!",
        status: 400,
      });
    }

    user = await User.findById(userId)
      .populate("followers", "_id name username about")
      .populate("following", "_id name username about")
      .populate("posts", "_id images caption");

    success = true;
    return res.json({ success, user, status: 200 });
  } catch (error) {
    success = false;
    console.log(`Error in unfollow/:id route: ${error.message}`);
    return res.json({ success, error: error.message, status: 500 });
  }
});

// ROUTE-6: Remove a user from followers list using PUT "/api/auth/remove/:id". Login required
router.put("/remove/:id", fetchUser, async (req, res) => {
  let success = false;
  const userId = req.user.id;
  const followerId = req.params.id;

  try {
    let user = await User.findById(userId);
    if (!user) {
      success = false;
      return res.json({ success, error: "User not found!", status: 404 });
    }

    let follower = await User.findById(followerId);
    if (!follower) {
      success = false;
      return res.json({ success, error: "User not found!", status: 404 });
    }

    if (user.followers.includes(follower._id)) {
      user = await User.findByIdAndUpdate(
        userId,
        { $pull: { followers: follower._id } },
        { new: true }
      );
    } else {
      success = false;
      return res.json({
        success,
        error: "This user is not following you!",
        status: 400,
      });
    }

    if (follower.following.includes(user._id)) {
      follower = await User.findByIdAndUpdate(
        followerId,
        { $pull: { following: user._id } },
        { new: true }
      );
    } else {
      success = false;
      return res.json({
        success,
        error: "The user is not following you!",
        status: 400,
      });
    }

    user = await User.findById(userId)
      .populate("followers", "_id name username about")
      .populate("following", "_id name username about")
      .populate("posts", "_id images caption");

    success = true;
    return res.json({ success, user, status: 200 });
  } catch (error) {
    success = false;
    return res.json({ success, error: error.message, status: 500 });
  }
});

// ROUTE-7: Get user suggestion: GET "/api/auth/getSuggestion". Require Login
router.get("/getSuggestion", fetchUser, async (req, res) => {
  let success = false;
  const userId = req.user.id;

  try {
    let user = await User.findById(userId);
    if (!user) {
      success = false;
      return res.json({ success, error: "User not found!", status: 400 });
    }

    let suggestions = await User.find({
      _id: { $ne: userId },
      followers: { $ne: userId },
    });

    success = true;
    return res.json({ success, suggestions, status: 200 });
  } catch (error) {
    success = false;
    console.log(`Error in getSuggestion route: ${error.message}`);
    return res.json({ success, error: error.message, status: 500 });
  }
});

// ROUTE-8: Edit user details using: PUT "/api/auth/editProfile". Require Login
router.put(
  "/editProfile",
  fetchUser,
  [
    body("name", "Name cannot be less than 5 characters!").isLength({ min: 5 }),
    body("username", "Username cannot be less than 5 characters!").isLength({
      min: 5,
    }),
    body("email", "Enter a valid email!").isEmail(),
  ],
  async (req, res) => {
    let success = false;
    const userId = req.user.id;
    const { name, username, email, profilepic, bio } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.json({ success, error: errors.array()[0].msg, status: 400 });
    }

    try {
      let user = await User.findById(userId);
      if (!user) {
        success = false;
        return res.json({ success, error: "User not found!", status: 400 });
      }

      let updateduser = {
        name: name,
        username: username,
        email: email,
        profilepic: profilepic,
        bio: bio,
      };

      if (profilepic && profilepic !== user.profilepic) {
        updateduser.profilepic = profilepic;
      }

      if (bio && bio !== user.bio) {
        updateduser.bio = bio;
      }

      let userUsername = null;
      let userEmail = null;

      if (username !== user.username) {
        userUsername = await User.findOne({ username: updateduser.username });
      }

      if (email !== user.email) {
        userEmail = await User.findOne({ email: updateduser.email });
      }

      if (userUsername) {
        success = false;
        return res.json({
          success,
          error: "This username is already taken!",
          status: 400,
        });
      }

      if (userEmail) {
        success = false;
        return res.json({
          success,
          error: "This email is associated to another account!",
          status: 400,
        });
      }

      user = await User.findByIdAndUpdate(
        userId,
        {
          name: updateduser.name,
          username: updateduser.username,
          email: updateduser.email,
          about: {
            profilepic: updateduser.profilepic,
            bio: updateduser.bio,
          },
        },
        { new: true }
      )
        .populate("followers", "_id name username profilepic")
        .populate("following", "_id name username profilepic")
        .populate("posts", "_id images caption");
      success = true;
      return res.json({ success, user, status: 200 });
    } catch (error) {
      success = false;
      console.log(`Error in editprofile route: ${error.message}`);
      return res.json({ success, error: error.message, status: 500 });
    }
  }
);

// ROUTE-9: Add Profile Picture using: PUT "/api/auth/adddp". Require Login
router.put(
  "/adddp",
  [body("image", "Enter a valid image").exists()],
  fetchUser,
  async (req, res) => {
    let success = false;
    const userId = req.user.id;
    const image = req.body.image;

    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      success = false;
      console.log(
        `Error in adddp route: Body is empty ${errors.array()[0].msg}`
      );
      return res.json({ success, error: errors.array()[0].msg, status: 400 });
    }
    try {
      let user = await User.findById(userId);
      if (!user) {
        success = false;
        return res.json({ success, error: "User not found!", status: 404 });
      }

      user = await User.findByIdAndUpdate(
        userId,
        { about: { profilepic: image } },
        { new: true }
      )
        .populate("followers", "_id name username profilepic")
        .populate("following", "_id name username profilepic")
        .populate("posts", "_id images caption");
      success = true;
      return res.json({ success, user, status: 200 });
    } catch (error) {
      success = false;
      console.log(`Error in adddp route: ${error.message}`);
      return res.json({ success, error: error.message, status: 500 });
    }
  }
);

// ROUTE-10: Search for users by their name using: GET "/api/auth/users/${name}". Require Login
router.get("/users/:name", fetchUser, async (req, res) => {
  let success = false;
  try {
    const userId = req.user.id;
    let user = await User.findById(userId);
    if (!user) {
      success = false;
      res.send({ success, error: "Not Found", status: 404 });
    }

    const name = req.params.name;
    let users = await User.find({ name: new RegExp(name, "i") });

    success = true;
    return res.json({ success, users, status: 200 });
  } catch (err) {
    success = false;
    console.log(`Error in users/:name route: ${err}`);
    res.send({ success, error: "Internal Server Error", status: 500 });
  }
});

// ROUTE-11: Get other user profile using: GET "/api/auth/users/:id". Require Login
router.get("/user/:id", fetchUser, async (req, res) => {
  let success = false;
  try {
    const otherId = req.params.id;
    const userId = req.user.id;

    let user = await User.findById(userId);
    if (!user) {
      success = false;
      return res.json({ success, error: "Not Found", status: 404 });
    }

    let otherUser = await User.findById(otherId)
      .populate("followers", "_id name username about")
      .populate("following", "_id name username about")
      .populate("posts", "_id image caption");

    if (!otherUser) {
      success = false;
      return res.json({ success, error: "Not Found", status: 404 });
    }

    success = true;
    return res.json({ success, otherUser, status: 200 });
  } catch (error) {
    success = false;
    console.log(`Error in user/:id route: ${error.message}`);
    return res.json({ success, error: error.message, status: 500 });
  }
});

// ROUTE-12: Get all the online user details using: GET "/api/auth/onlineusers/". Require Login
router.put(
  "/onlineusers/",
  [body("users", "Invalid users list").isArray()],
  fetchUser,
  async (req, res) => {
    let success = false;
    const { users } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      console.log(
        `Error in onlineusers route: Body is empty ${errors.array()[0].msg}`
      );
      return res.json({ success, errors: errors.array()[0].msg, status: 400 });
    }
    try {
      const userId = req.user.id;
      let onlineUsers = [];
      let user = await User.findById(userId);
      if (!user) {
        success = false;
        return res.json({ success, error: "Not Found", status: 404 });
      }

      for (let i = 0; i < users.length; i++) {
        const otherId = users[i];
        let otherUser = await User.findById(otherId);

        if (!otherUser) {
          success = false;
          return res.json({ success, error: "Not Found", status: 404 });
        } else {
          onlineUsers.push(otherUser);
        }
      }

      success = true;
      return res.json({ success, onlineUsers, status: 200 });
    } catch (error) {
      success = false;
      console.log(`Error in onlineusers route: ${error.message}`);
      return res.json({ success, error: error.message, status: 500 });
    }
  }
);

module.exports = router;
