require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// Model
const UserModel = require("../models/User");

class User {
  async create(req, res) {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    try {
      const user = new UserModel({
        name: name,
        email: email,
        password: passwordHash,
        // profilePicture: profilePicture.path,
      });

      await user.save();

      res.status(201).json({ user });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error to create a user!", error: error.message });
    }
  }

  async login(req, res) {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    try {
      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error to login!", error: error.message });
    }
  }

  async updatePicture(req, res) {
    const userId = req.params.id;
    const profilePicture = req.file;

    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.profilePicture = profilePicture.path;
      await user.save();

      res.status(200).json({ message: "Profile picture updated successfully" });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error updating profile picture",
          error: error.message,
        });
    }
  }
}

module.exports = new User();
