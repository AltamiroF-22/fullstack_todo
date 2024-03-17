const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TodoUser",
    },
  ],
});

const User = mongoose.model("TodoUser", userSchema);

module.exports = User;
