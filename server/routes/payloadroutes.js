const express = require("express");
const { saveCustomSystem } = require("../controllers/payloadController");
const auth = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/saveCustomSystem",auth,saveCustomSystem);

module.exports = router;