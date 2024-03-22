const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

class UserMiddleware {
  //-------------------- create user--------------------------------
  async checkCreate(req, res, next) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(422).json({ message: "all fields are required!" });
    }

    if (password.length < 8) {
      return res.status(422).json({
        field: "passwordRef",
        message: "the password can't be less than 8 characters",
      });
    }

    try {
      const userEmailExist = await UserModel.findOne({ email });
      if (userEmailExist) {
        return res
          .status(409)
          .json({ field: "emailRef", message: "this email is already in use" });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  //-------------------- check login--------------------------------
  async checkLogin(req, res, next) {
    const { email, password } = req.body;
    if (!email) {
      return res
        .status(422)
        .json({ field: "emailRef", message: "Email is required!" });
    }
    if (!password) {
      return res
        .status(422)
        .json({ field: "passwordRef", message: "Password is required!" });
    }

    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res
          .status(401)
          .json({ field: "emailRef", message: "This user does not exist!" });
      }

      const userPassword = await bcrypt.compare(password, user.password);
      if (!userPassword) {
        return res
          .status(401)
          .json({ field: "passwordRef", message: "the password is not matching" });
      }
      next();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error to login!", error: error.message });
    }
  }
}

module.exports = new UserMiddleware();
