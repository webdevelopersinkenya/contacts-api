const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// GET all users
router.get("/", async (req, res, next) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// CREATE user
router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    
    // Mongoose validation error
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: err.message,
        errors: err.errors
      });
    }

    // Duplicate email error (if you added email unique)
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    next(err);
  }
});

// GET by ID
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,          // return updated document
        runValidators: true // IMPORTANT: ensures schema validation runs
      }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});
router.post("/register", async (req, res, next) => {
  try {
    const { name, age, email, password } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      age,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (err) {
    next(err);
  }
});
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // create token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      "secretKey123", // later move to .env
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (err) {
    next(err);
  }
});
module.exports = router;