const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// allow frontend
app.use(cors());

// where to save images
const upload = multer({ dest: "uploads/" });

// route to upload file
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    imageUrl: `http://localhost:${PORT}/uploads/${req.file.filename}`,
  });
});

// serve uploads folder
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
