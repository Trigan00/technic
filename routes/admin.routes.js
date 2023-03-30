const Router = require("express");
const multer = require("multer");
const sh = require("shorthash");
const { unlink } = require("node:fs/promises");
const path = require("path");

const {
  models: { Technic },
} = require("../models");

const router = new Router();

function nameConvert(filename) {
  const [name, extension] = filename.split(".");
  return sh.unique(name) + "." + extension;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "technicImages/");
  },
  filename: (req, file, cb) => {
    const name = nameConvert(file.originalname);
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

router.post("/addTechnic", upload.array("files"), async (req, res) => {
  try {
    const {
      files,
      body: { name, fullDescription, shortDescription, characteristic, price },
    } = req;

    console.log(files);
    await Technic.create({
      name,
      fullDescription,
      shortDescription,
      characteristic,
      imgname: nameConvert(files[0].originalname),
      imgFileDescription: nameConvert(files[1].originalname),
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

module.exports = router;
