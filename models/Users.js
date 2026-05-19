const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "aura"],
    trim: true,
    minlength: 2
  },
  age: {
    type: Number,
    min: 0,
    required: true
  }
});

module.exports = mongoose.model("user", userSchema);