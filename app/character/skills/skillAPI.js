const express = require("express");
const skillController = require("./skillController");

const router = express.Router();

router.get("/skills", skillController.findAll);

router.post("/skills", skillController.create);

router.put("/skills/:id", skillController.update);

router.delete("/skills/:id", skillController.remove);

module.exports = router;
