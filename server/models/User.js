



const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  customSystems: [
    { type: mongoose.Schema.Types.ObjectId, ref: "CustomSystem" }
  ]
  
});

module.exports = mongoose.model("User", userSchema);
