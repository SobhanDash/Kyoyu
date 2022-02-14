// Route for user authentication and user details
const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
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
    body("phone", "Enter a valid phone number").isLength({ min: 10 }),
    body("password", "Enter a valid password")
      .isLength({ min: 8 })
      .matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.json({ success, errors: errors.array(), status: 400 });
    }
    try {
      let userEmail = await User.findOne({ email: reqq.body.email });
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

      let userPhone = await User.findOne({ phone: req.body.phone });
      if (userPhone) {
        success = false;
        return res.json({
          success,
          error: "Phone is associated to another account",
          status: 400,
        });
      }

      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: securePassword,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, secret);
      success = true;
      rs.json({ success, authToken, status: 200 });

    } catch (err) {
      res.send({ error: `Internal Server Error: ${err}`, status: 500 });
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
      return res.json({ success, error: errors.array()[0].msg, status: 400 });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.json({
          success,
          error:
            "No account is associated to this email, you need to register first",
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
      res.json({ success, authToken, status: 200 });
    } catch (err) {
      res.send({ error: err, status: 500 });
    }
  }
);