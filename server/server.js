const express = require('express')
const bcrypt  = require ('bcryptjs')
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const payloadRoutes = require("./routes/payloadroutes.js");

const app = express();

connectDB();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // React frontend
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/payload", payloadRoutes);

// router.post("/custom-systems", auth, async (req, res) => {
//   try {
//     console.log("reached server");
//     const userId = req.user.id;   // from JWT middleware

//     // 1. Create new system document
//     const system = await CustomSystem.create(req.body);

//     // 2. Attach system ID to user
//     await User.findByIdAndUpdate(userId, {
//       $push: { customSystems: system._id }
//     });

//     res.json({
//       message: "Custom system saved successfully",
//       system
//     });

//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ error: "Failed to save system" });
//   }
// });


app.listen(5000,()=>{console.log("server started on port 5000") })
