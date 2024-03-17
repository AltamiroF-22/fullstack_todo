const jwt = require("jsonwebtoken");

class Token {
  async check(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access denied" });
    }
    try {
      const secret = process.env.SECRET;
      const decodedToken = jwt.verify(token, secret);

      const userId = decodedToken.id;

      req.user = { id: userId };

      next();
    } catch (error) {
      res.status(400).json({ message: "Token invalid!" });
    }
  }
}

module.exports = new Token();
