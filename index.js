const express = require("express");
const bodyParser = require("body-parser");
const {
  adminRouter,
  technicRouter,
  authRouter,
  userRouter,
} = require("./routes");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
require("dotenv").config();
const db = require("./models");
const authMiddleware = require("./middleware/auth.middleware");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.static(__dirname + "/technicImages"));

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 15, // 15 requests,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  message: async (request, response) => {
    response.json({
      status: "failure",
      message: "Too many requests, please try again later.",
    });
  },
});

app.use("/api/auth", limiter);

app.use("/api/auth", authRouter);
app.use("/api/technic", technicRouter);
app.use("/api/admin", authMiddleware.isAdmin, adminRouter);
app.use("/api/user", authMiddleware.decodeToken, userRouter);

(async () => {
  await db.sequelize.sync();
})();

app.get("/", (req, res) => {
  res.status(200).json("Сервер работает");
});

app.listen(PORT, () => console.log("SERVER STARTED ON PORT " + PORT));
