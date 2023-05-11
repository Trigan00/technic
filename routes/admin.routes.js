const Router = require("express");
const multer = require("multer");
const sh = require("shorthash");
const { unlink } = require("node:fs/promises");
const path = require("path");

const {
  models: { Technic, Allorders },
} = require("../models");

const router = new Router();

function nameConvert(filename, timestamp) {
  const [name, extension] = filename.split(".");
  return sh.unique(name) + timestamp + "." + extension;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "technicImages/");
  },
  filename: (req, file, cb) => {
    const name = nameConvert(file.originalname, req.body.timestamp);
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

router.post("/addTechnic", upload.array("files"), async (req, res) => {
  try {
    const {
      files,
      body: {
        name,
        type,
        fullDescription,
        shortDescription,
        characteristic,
        price,
        timestamp,
      },
    } = req;

    await Technic.create({
      name,
      type,
      fullDescription,
      shortDescription,
      characteristic,
      imgname: nameConvert(files[0].originalname, timestamp),
      imgFileDescription: nameConvert(files[1].originalname, timestamp),
      price: +price,
    });

    return res
      .status(201)
      .json({ status: "success", message: "техника добавлена." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});
router.delete("/deleteTechnic/:id", async (req, res) => {
  try {
    const technicId = req.params.id;

    const [technic] = await Technic.findAll({
      where: {
        id: technicId,
      },
    });
    await unlink(
      path.join(__dirname, "..", "technicImages", technic.dataValues.imgname)
    );
    await unlink(
      path.join(
        __dirname,
        "..",
        "technicImages",
        technic.dataValues.imgFileDescription
      )
    );

    await Allorders.destroy({
      where: {
        technicId: technicId,
      },
    });

    await Technic.destroy({
      where: {
        id: technicId,
      },
    });

    return res
      .status(201)
      .json({ status: "success", message: "техника успешно удалена." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});

router.put(
  "/updateTechnic/:id",
  /* upload.array("files"), */ async (req, res) => {
    try {
      const technicId = req.params.id;

      await Technic.update(
        { ...req.body },
        {
          where: {
            id: +technicId,
          },
        }
      );

      return res.status(201).json({
        status: "success",
        message: "Данные техники успешно обновлены.",
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

router.put("/updateImages/", upload.single("file"), async (req, res) => {
  try {
    const {
      file,
      body: { technicId, type, timestamp },
    } = req;

    const [technic] = await Technic.findAll({
      where: {
        id: +technicId,
      },
    });

    if (type === "imgname") {
      await unlink(
        path.join(__dirname, "..", "technicImages", technic.dataValues.imgname)
      );
    } else {
      await unlink(
        path.join(
          __dirname,
          "..",
          "technicImages",
          technic.dataValues.imgFileDescription
        )
      );
    }

    console.log(file);
    await Technic.update(
      { [type]: nameConvert(file.originalname, timestamp) },
      {
        where: {
          id: +technicId,
        },
      }
    );

    return res
      .status(201)
      .json({ status: "success", message: "Изображение обновлено." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});

router.get("/getOrders", async (req, res) => {
  try {
    const orders = await Allorders.findAll();

    const formattedArr = orders.map(({ dataValues }) => dataValues);

    return res.status(200).json({
      status: "success",
      orders: formattedArr || [],
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
      .json({ status: "success", message: "Заказ успешно удалена." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});

router.put("/updateStatus/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    await Allorders.update(
      { status },
      {
        where: {
          id: orderId,
        },
      }
    );

    return res.status(201).json({
      status: "success",
      message: "Статус заказа успешно обновлен.",
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
