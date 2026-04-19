const express = require("express");
const router = express.Router();
const User = require("./Model");

// READ ALL
router.get("/", async (req, res) => {
  res.send("API RUNING....");
});



module.exports = router;