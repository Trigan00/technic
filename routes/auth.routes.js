const Router = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { body, validationResult } = require("express-validator");
const { activationMailer, forgetPasswordMailer } = require("../mailService");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");
require("dotenv").config();

const {
  models: { Person },
} = require("../models");

const generateToken = (id) => {
  return jwt.sign({ userId: id }, process.env.jwtSecret); // without expire
  // if time has passed, you must also check when you first visit the page whether the time has expired
  // return jwt.sign({ userId: id }, process.env.jwtSecret, {
  //   expiresIn: "24h",
  // });
};

// /api/auth/register
router.post(
  "/register",
  [
    body("email", "Uncorrected email").isEmail(),
    body("password", "The minimum password length is 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: "failure",
          errors: errors.array(),
          message: "Incorrect data during registration",
        });
      }

      const { email, password, username } = req.body;
      const candidate = await Person.findAll({
        where: {
          email,
        },
      });

      if (candidate.length) {
        return res
          .status(400)
          .json({ status: "failure", message: "User already exists" });
      }

      const activationLink = uuid.v4();
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await Person.create({
        email,
        password: hashedPassword,
        username,
        activationLink,
      });

      activationMailer(
        email,
        `${process.env.API_URL}/api/auth/activate/${activationLink}`
      );

      return res.status(201).json({
        status: "success",
        message: "User added. Confirm your email address",
        user: {
          email: user.dataValues.email,
          id: user.dataValues.id,
          username: user.dataValues.username,
          isVerified: user.dataValues.isVerified,
          token: generateToken(user.dataValues.id),
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "failure",
        message: "Something went wrong, try again",
      });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    body("email", "Uncorrected email").isEmail(),
    body("password", "The minimum password length is 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: "failure",
          errors: errors.array(),
          message: "Incorrect data during authentication",
        });
      }

      const { email, password } = req.body;
      // const user = await pool.query("SELECT * FROM person WHERE email = $1", [
      //   email,
      // ]);
      const users = await Person.findAll({
        where: {
          email,
        },
      });
      if (!users.length) {
        return res.status(400).json({
          status: "failure",
          message: "Invalid login or password, try again", // login
        });
      }
      const user = users[0].dataValues;

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          status: "failure",
          message: "Invalid login or password, try again", // password
        });
      }

      res.json({
        token: generateToken(user.id),
        id: user.id,
        email: user.email,
        isVerified: user.isVerified,
        username: user.username,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "failure",
        message: "Something went wrong, try again",
      });
    }
  }
);

router.get("/activate/:link", async (req, res) => {
  try {
    const activationLink = req.params.link;

    await Person.update(
      { isVerified: true },
      {
        where: {
          activationLink,
        },
      }
    );

    return res.redirect(process.env.CLIENT_URL);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});

router.get("/validateToken", authMiddleware.decodeToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const users = await Person.findAll({
      where: {
        id: userId,
      },
    });
    const user = users[0].dataValues;
    res.json({
      isVerified: user.isVerified,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});

router.post(
  "/forget-password",
  [body("email", "Uncorrected email").isEmail()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: "failure",
          errors: errors.array(),
          message: "Incorrect data during registration",
        });
      }

      const { email } = req.body;
      const users = await Person.findAll({
        where: {
          email,
        },
      });
      if (!users.length) {
        return res.status(400).json({
          status: "failure",
          message: "Пользователь не найден", // login
        });
      }

      const user = users[0];
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.jwtSecret,
        {
          expiresIn: "15min",
        }
      );

      forgetPasswordMailer(
        email,
        `${process.env.CLIENT_URL}/reset-password/${token}`
      );

      return res.status(201).json({
        status: "success",
        message: "Письмо отправлено на почту",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "failure",
        message: "Something went wrong, try again",
      });
    }
  }
);

router.put(
  "/update-password",
  [
    body("password", "The minimum password length is 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: "failure",
          errors: errors.array(),
          message: "Incorrect data during registration",
        });
      }
      const { password, token } = req.body;

      if (!token) {
        return res.status(401).json({ message: "Время и Стекло" });
      }

      const decoded = jwt.verify(token, process.env.jwtSecret);
      if (!decoded) res.status(401).json({ message: "Время и Стекло" });

      const hashedPassword = await bcrypt.hash(password, 12);
      const person = await Person.update(
        { password: hashedPassword },
        {
          where: {
            email: decoded.email,
          },
        }
      );

      if (!person)
        return res.status(400).json({
          status: "failure",
          message: "Пользователь не найден",
        });

      return res.status(201).json({
        status: "success",
        message: "Пароль пользователя успешно изменен",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "failure",
        message: "Время и Стекло",
      });
    }
  }
);

module.exports = router;
