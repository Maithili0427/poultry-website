const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// ✅ REGULAR SIGNUP (already working)
router.post("/signup", async (req, res) => {
  try {
    console.log('✅ REGULAR SIGNUP HIT:', req.body);
    
    const { email, password, name } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "regular",
      status: "approved"
    });
    
    await user.save();
    
    res.status(201).json({ 
      success: true, 
      message: "Account created successfully!",
      user: { email, name, role: 'regular' }
    });
    
  } catch (err) {
    console.error('Regular signup error:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ BUSINESS SIGNUP (YOUR MISSING ROUTE!)
router.post("/signup-business", async (req, res) => {
  try {
    console.log('✅ BUSINESS SIGNUP HIT:', req.body);
    
    const { 
      businessName, 
      ownerName, 
      email, 
      phone, 
      password, 
      registrationNumber 
    } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create business user
    const user = new User({
      businessName,
      ownerName,
      email,
      phone,
      password: hashedPassword,
      registrationNumber: registrationNumber || "",
      role: "business",  // ✅ Key field your frontend expects
      status: "pending"  // ✅ Awaits admin approval
    });
    
    await user.save();
    
    console.log('✅ Business user created:', { email, role: 'business', status: 'pending' });
    
    res.status(201).json({ 
      success: true, 
      message: "Business account created! Awaiting admin approval.",
      role: "business",
      status: "pending"
    });
    
  } catch (err) {
    console.error('Business signup error:', err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// ✅ LOGIN ROUTE (make sure this exists)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select('+password');
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    res.json({ 
      message: "Login successful", 
      role: user.role,      // ✅ Returns "business" for business users
      status: user.status   // ✅ Returns "pending"/"approved"
    });
    
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
