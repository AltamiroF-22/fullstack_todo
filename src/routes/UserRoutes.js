const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

// controllers
const UserController = require("../controllers/createUser");
const TaskController = require("../controllers/createTasks");

// middleware
const UserMiddleware = require("../middlewares/userMiddleware");
const Token = require("../middlewares/checkToken");

router.get("/test", (req, res) => {
  res.status(200).json({ message: "OK" });
});

// create User
router.post(
  "/create-user",
  upload.single("file"),
  UserMiddleware.checkCreate,
  UserController.create
);

// Login user
router.post("/login", UserMiddleware.checkLogin, UserController.login);

//search user
router.get("/user-search", Token.check, UserController.searchUsersByName);

//add friends
router.put("/user-search", Token.check, UserController.addFriend);

//remove friend
router.delete("/remove-friend/:friendId", Token.check, UserController.removeFriend);

// Update Img Profile
router.patch(
  "/update-picture/:id",
  Token.check,
  upload.single("file"),
  UserController.updatePicture
);

// create task
router.post("/new-task", Token.check, TaskController.createTask);

// get all task from userId
router.get(
  "/all-task-from/:id",
  Token.check,
  TaskController.getAllTaksFromUserId
);

// delete single task
router.delete("/single-task/:id", Token.check, TaskController.deleteSingleTask);

// update single task
router.patch("/single-task/:id", Token.check, TaskController.updateSingleTask);

module.exports = router;
