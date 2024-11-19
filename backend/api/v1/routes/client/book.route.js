const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/book.controller");

router.get("/", controller.index);

router.get("/detail/:slugBook", controller.detail);

router.get("/detail/:slugBook/:quantity", controller.detail);

router.patch("/change-status/:slugBook", controller.changeStatus);

router.get("/search", controller.result);

module.exports = router;
