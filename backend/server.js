const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();

app.use(cors());
app.use(express.json());

// ✅ FIXED: No deprecated options
mongoose.connect("mongodb://localhost:27017/poultry")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "regular" },
  businessName: String,
  status: { type: String, default: "approved" }
});
const User = mongoose.model("User", UserSchema);

// 🔥 LOGIN
app.post("/api/auth/login", async (req, res) => {
  console.log("🔥 LOGIN:", req.body.email);
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (user && await bcrypt.compare(password, user.password)) {
    res.json({ role: user.role || "business", status: user.status });
  } else {
    res.status(401).json({ message: "Wrong credentials" });
  }
});

// 🔥 SIGNUP BUSINESS
app.post("/api/auth/signup-business", async (req, res) => {
  console.log("🔥 SIGNUP:", req.body.email);
  const { email, password, businessName, ownerName } = req.body;
  
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "Email exists" });
  
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashed, businessName, ownerName, role: "business" });
  res.json({ message: "Business created!", role: "business" });
});

// 🔥 TEST USER
app.get("/test-user", async (req, res) => {
  const hashed = await bcrypt.hash("password123", 10);
  await User.create({
    email: "business@test.com",
    password: hashed,
    role: "business",
    businessName: "Test Poultry"
  });
  res.send("✅ Test user created! Email: business@test.com, Pass: password123");
});

app.listen(5000, () => console.log("🚀 Server: http://localhost:5000"));
