require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// Model
const UserModel = require("../models/User");

class User {
  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      const profilePicture = req.file;

      const user = new UserModel({
        name: name,
        email: email,
        password: password,
        profilePicture: profilePicture.path || "../assets/img/default_img.webp",
      });

      await user.save();

      res.status(201).json({ user });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error to create a user!", error: error.message });
    }
  }
}

module.exports = new User();
