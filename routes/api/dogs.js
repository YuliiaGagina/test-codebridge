const express = require("express");
const timeout = require("connect-timeout");


const { dogs: ctrl } = require("../../controllers");
const { createDogValidation } = require("../../models/dog");
const router = express.Router();

const { validation, ctrlWrapper } = require("../../middlewares");

router.get("/", timeout("5s"), ctrlWrapper(ctrl.getAllandSort));


router.post(
  "/",
  timeout("5s"),
  validation(createDogValidation),
  ctrlWrapper(ctrl.addDog)
);

router.delete("/:id", timeout("5s"), ctrlWrapper(ctrl.deleteDog));

module.exports = router;
