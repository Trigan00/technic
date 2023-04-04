const jwt = require("jsonwebtoken");
const {
  models: { Person },
} = require("../models");
require("dotenv").config();

class Middleware {
  async isAdmin(req, res, next) {
    if (req.method === "OPTIONS") {
      return next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No authorization" });
      }

      const decoded = jwt.verify(token, process.env.jwtSecret);
      const users = await Person.findAll({
        where: {
          id: decoded.userId,
        },
      });
      const user = users[0].dataValues;
      if (user.isAdmin) return next();

      return res.status(401).json({ message: "Вы не администратор" });
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: "No authorization" });
    }
  }

  decodeToken(req, res, next) {
    if (req.method === "OPTIONS") return next();
    if (req.url.split("/")[1] === "busyDays") return next();

    try {
      const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"
      if (!token) {
        return res.status(401).json({ message: "No authorization" });
      }

      const decoded = jwt.verify(token, process.env.jwtSecret);
      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({ message: "No authorization" });
    }
  }
}

module.exports = new Middleware();
