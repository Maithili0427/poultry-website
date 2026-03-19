const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// ✅ NEW: REGULAR USER SIGNUP (Your frontend needs this!)
router.post("/signup", async (req, res) => {
  try {
    console.log('✅ REGULAR SIGNUP HIT:', req.body);
    
    const { email, password, name, role } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create regular user
    const user = new User({
      name,  // Regular users have 'name' field
      email,
      password: hashedPassword,
      role: "regular",
      status: "approved"  // Regular users auto-approved
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

// ✅ YOUR EXISTING BUSINESS SIGNUP (keep this)
router.post("/signup-business", async (req, res) => {
  // ... your existing business code (unchanged)
});

// ✅ YOUR EXISTING LOGIN (keep this)  
router.post("/login", async (req, res) => {
  // ... your existing login code (unchanged)
});

// ✅ YOUR OTHER ROUTES (keep all these)
router.get("/business-users", async (req, res) => {
  // ... unchanged
});

router.put("/approve-business/:id", async (req, res) => {
  // ... unchanged
});

module.exports = router;
