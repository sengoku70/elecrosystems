const User = require("../models/User.js");
const CustomSystem = require("../models/circuitmodel.js");




exports.saveCustomSystem = async (req, res) => {
  try {
    console.log("reached controller");

    const userId = req.user.id; // from auth middleware
    const user = await User.findById(userId);
    
    // Create system with userId and username
    const system = await CustomSystem.create({
      ...req.body,
      userId: userId,
      username: user.username
    });

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

// Get all custom systems (for community feed)
exports.getAllCustomSystems = async (req, res) => {
  try {
    const systems = await CustomSystem.find()
      .populate("userId", "username")
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      message: "Retrieved all custom systems",
      systems
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch systems" });
  }
};

// Get systems by a specific user
exports.getUserSystems = async (req, res) => {
  try {
    const { userId } = req.params;
    const systems = await CustomSystem.find({ userId })
      .sort({ createdAt: -1 });

    res.json({
      message: "Retrieved user systems",
      systems
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user systems" });
  }
};

// Get single custom system by ID
exports.getCustomSystemById = async (req, res) => {
  try {
    const { systemId } = req.params;
    const system = await CustomSystem.findById(systemId)
      .populate("userId", "username");

    if (!system) {
      return res.status(404).json({ error: "System not found" });
    }

    res.json({
      message: "Retrieved custom system",
      system
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch system" });
  }
};

// Get systems for the authenticated user
exports.getMySystems = async (req, res) => {
  try {
    const userId = req.user.id;
    const systems = await CustomSystem.find({ userId }).sort({ createdAt: -1 });
    res.json({ message: "Retrieved my systems", systems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch my systems" });
  }
};

// Delete a custom system (authenticated user must own it)
exports.deleteCustomSystem = async (req, res) => {
  try {
    const { systemId } = req.params;
    const userId = req.user.id;

    const system = await CustomSystem.findById(systemId);
    if (!system) return res.status(404).json({ error: "System not found" });
    if (String(system.userId) !== String(userId)) return res.status(403).json({ error: "Not authorized" });

    await CustomSystem.findByIdAndDelete(systemId);
    // remove reference from user
    await User.findByIdAndUpdate(userId, { $pull: { customSystems: systemId } });

    res.json({ message: "System deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete system" });
  }
};


