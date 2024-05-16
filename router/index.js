const express = require("express");
const router = express.Router();
const postUrl = require("../controller/postUrl");

router.get("/", postUrl.healthCheck);
router.post("/post", postUrl.postUrl);

module.exports = router;
