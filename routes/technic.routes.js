const Router = require("express");
const {
  models: { Technic },
} = require("../models");
const router = new Router();

router.get("/getAll", async (req, res) => {
  try {
    const data = await Technic.findAll();

    return res.status(201).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});

module.exports = router;
