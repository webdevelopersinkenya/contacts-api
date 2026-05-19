const express = require("express");
const router = express.Router();
const User = require("../models/Users");

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
    next(err);
  }
});

// GET by ID
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
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
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;