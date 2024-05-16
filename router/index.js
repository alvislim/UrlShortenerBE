const express = require("express");
const router = express.Router();
const postUrl = require("../controller/postUrl");
const redirectUrl = require("../controller/redirectUrl");

// router.get("/", postUrl.healthCheck);
router.post("/post", postUrl.postUrl);
router.get("/:urlId", redirectUrl.redirection);

module.exports = router;
