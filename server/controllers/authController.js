const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");


const SECRET_KEY = "mysecretkey"; // use .env in real projects

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate password length before hashing
    if (!password || password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }

    // check by username or email
    const existingByUsername = username ? await User.findOne({ username }) : null;
    const existingByEmail = email ? await User.findOne({ email }) : null;
    if (existingByUsername) return res.status(400).json({ error: "Username already exists" });
    if (existingByEmail) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed in auth controller" });
  }
};

const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = email ? await User.findOne({ email }) : await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log("user: ",  req.user);
    res.json({ message: "Profile data", user });
  } catch (err) {
    res.status(500).json({ error: "Fetching profile failed" });
  }
};

module.exports = { signup, login, profile };
