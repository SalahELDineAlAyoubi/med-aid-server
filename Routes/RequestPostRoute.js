const express = require("express");
const { createRequest, getRequests } = require("../Controllers/RequestPostController");
const router = express.Router();

router.post("/", createRequest);
router.get("/", getRequests);


module.exports = router;