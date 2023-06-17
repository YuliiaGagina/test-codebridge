const express = require("express");


const router = express.Router();



router.get("/", (req, res) => {
  res.send("Dogshouseservice.Version1.0.1");
});

module.exports = router;
