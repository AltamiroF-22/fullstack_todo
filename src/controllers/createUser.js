require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// Model
const UserModel = require("../models/User");

class User {
  //-------------------- create user--------------------------------

  async create(req, res) {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    try {
      const user = new UserModel({
        name: name,
        email: email,
        password: passwordHash,
      });

      await user.save();

      res.status(201).json({ user });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error to create a user!", error: error.message });
    }
  }

  //--------------------  login--------------------------------
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

  //-------------------- update picture--------------------------------
  async updatePicture(req, res) {
    const userId = req.params.id;
    const profilePicture = req.file;

    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.profilePicture) {
        fs.unlinkSync(user.profilePicture);
      }

      user.profilePicture = profilePicture.path;
      await user.save();

      res.status(200).json({ message: "Profile picture updated successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Error updating profile picture",
        error: error.message,
      });
    }
  }

  //-------------------- search user by name--------------------------------
  async searchUsersByName(req, res) {
    const { name } = req.query;

    try {
      const users = await UserModel.find({
        name: { $regex: new RegExp(name, "i") },
      });

      res.status(200).json({ users });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error searching users", error: error.message });
    }
  }

  //-------------------- add friend --------------------------------
  async addFriend(req, res) {
    const { name } = req.query;

    try {
      const newFriend = await UserModel.findOne({ name: name });

      if (!newFriend) {
        return res.status(404).json({ message: "User not found" });
      }

      const newFriendId = newFriend._id;

      const user = await UserModel.findByIdAndUpdate(
        req.user.id,
        { $addToSet: { friends: newFriendId } },
        { new: true }
      );

      res.status(200).json({ message: "Friend added successfully", user });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error adding friend", error: error.message });
    }
  }
  
  //-------------------- remove friend --------------------------------
  async removeFriend(req, res) {
    const userId = req.user.id; 
    const friendId = req.params.friendId;

    try {
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      
      user.friends.pull(friendId);
      await user.save();

      res.status(200).json({ message: "Friend removed successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error removing friend", error: error.message });
    }
  }
}

module.exports = new User();
