const express = require("express");
const { 
  saveCustomSystem, 
  getAllCustomSystems,
  getUserSystems,
  getCustomSystemById
} = require("../controllers/payloadController");


const { getMySystems, deleteCustomSystem } = require("../controllers/payloadController");
const auth = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/saveCustomSystem", auth, saveCustomSystem);
router.get("/all", getAllCustomSystems);
router.get("/user/:userId", getUserSystems);
router.get("/mine", auth, getMySystems);
router.get("/:systemId", getCustomSystemById);
router.delete("/:systemId", auth, deleteCustomSystem);

module.exports = router;