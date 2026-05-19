const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: 2
  },

  age: {
    type: Number,
    required: [true, "Age is required"],
    min: 0
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6
  }
});

module.exports = mongoose.model("User", userSchema);