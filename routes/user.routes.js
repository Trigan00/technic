const Router = require("express");
const { Op } = require("sequelize");
const { orderMailer } = require("../mailService");
const {
  models: { Allorders, Person },
} = require("../models");
const router = new Router();

router.post("/order", async (req, res) => {
  try {
    const { technicId, dates, username, useremail, technicname } = req.body;
    const userId = req.user.userId;

    const users = await Person.findAll({
      where: {
        id: userId,
      },
    });

    if (!users[0].dataValues.isVerified)
      return res.status(400).json({
        status: "failure",
        message: "Необходимо подтвердить email",
      });

    const userOrders = await Allorders.findAll({
      where: {
        personId: userId,
        technicId: technicId,
        [Op.or]: [{ status: "pending" }, { status: "given" }],
      },
    });

    if (userOrders.length) {
      return res.status(400).json({
        status: "failure",
        message: "У вас уже есть заказ этой техники",
      });
    }

    const order = await Allorders.create({
      personId: userId,
      technicId: technicId,
      username,
      useremail,
      technicname,
      dates: dates.join("-"),
      status: "pending",
    });

    orderMailer(useremail, username, technicname);

    return res.status(201).json({
      status: "success",
      message: "Ваш заказ добавлен, ожидайте звонка",
      order: {
        id: order.dataValues.id,
        status: order.dataValues.status,
        userid: order.dataValues.personId,
        technicid: order.dataValues.technicId,
        dates: order.dataValues.dates,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});

router.get("/busyDays/:id", async (req, res) => {
  try {
    const technicId = req.params.id;
    const busyDays = await Allorders.findAll({
      where: {
        technicId,
        [Op.or]: [{ status: "pending" }, { status: "given" }],
      },
    });

    const arr = busyDays.reduce(
      (acc, { dataValues }) => acc.concat(dataValues.dates.split("-")),
      []
    );

    return res.status(201).json({
      status: "success",
      busyDaysArr: arr,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});

router.get("/myOrders", async (req, res) => {
  try {
    const personId = req.user.userId;

    // let orders = [];
    // if (type === "current") {
    //   orders = await Allorders.findAll({
    //     where: {
    //       userid: userId,
    //       [Op.or]: [{ status: "pending" }, { status: "given" }],
    //     },
    //   });
    // } else {
    const orders = await Allorders.findAll({
      where: {
        personId: personId,
      },
    });
    //}

    const formattedArr = orders.map(({ dataValues }) => {
      return {
        id: dataValues.id,
        userid: dataValues.personId,
        technicid: dataValues.technicId,
        dates: dataValues.dates,
        status: dataValues.status,
      };
    });

    return res.status(200).json({
      status: "success",
      orders: formattedArr,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});

router.delete("/deleteOrder/:id", async (req, res) => {
  try {
    const orderId = req.params.id;

    await Allorders.destroy({
      where: {
        id: orderId,
      },
    });

    return res
      .status(201)
      .json({ status: "success", message: "Заказ успешно удален." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});
module.exports = router;
