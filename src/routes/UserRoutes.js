const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

//controllers
const UserController = require("../controllers/createUser");

router.get("/test", (req, res) => {
  res.status(200).json({ message: "OK" });
});

router.post("/", upload.single("file"), UserController.create);

module.exports = router;
