const User = require("../models/User.js");
const CustomSystem = require("../models/circuitmodel.js");




exports.saveCustomSystem = async (req, res) => {
  try {
    console.log("reached controller");

    const userId = req.user.id; // from auth middleware
    
    // Create system
    const system = await CustomSystem.create(req.body);

    // Attach to user
    await User.findByIdAndUpdate(userId, {
      $push: { customSystems: system._id }
    });

    res.json({
      message: "Custom system saved successfully",
      system
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save system in payload controller" });
  }
};


