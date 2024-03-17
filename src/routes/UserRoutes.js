const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

// controllers
const UserController = require("../controllers/createUser");

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


// Update Img Profile
router.patch(
  "/update-picture/:id",
  Token.check,
  upload.single("file"),
  UserController.updatePicture
);

module.exports = router;
