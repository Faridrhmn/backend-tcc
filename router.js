const express = require("express");
const router = express.Router();
const controller = require("./controllers/controller");

router.post("/register", controller.create);
router.post("/login",controller.findUser);

module.exports = router;