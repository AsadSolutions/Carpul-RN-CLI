const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const Ride = require("./models/ride");
const rideRoutes = require("./controllers/ride");

const app = express();
app.use(cors());
app.use(express.json());

// connect to MongoDB Atlas
mongoose.connect(
  "mongodb+srv://jot19x98mongo:fAXB1QzqfzUm8Ngz@cluster0.d9qqohz.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// define the user schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// handle user registration
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // generate a JWT token
    const token = jwt.sign({ email }, "secret");
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// handle user login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // compare the passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generate a JWT token
    const token = jwt.sign({ email }, "secret");
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Routes
app.use(rideRoutes);
// start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
