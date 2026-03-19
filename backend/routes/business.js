const express = require("express");
const router = express.Router();
const Business = require("../models/Business");


// Register Business
router.post("/register", async (req,res)=>{

  const business = new Business(req.body);

  await business.save();

  res.json({message:"Business registration submitted for approval"});

});


// Get All Businesses (Admin)
router.get("/all", async (req,res)=>{

  const businesses = await Business.find();

  res.json(businesses);

});


// Approve Business
router.put("/approve/:id", async (req,res)=>{

  await Business.findByIdAndUpdate(req.params.id,{approved:true});

  res.json({message:"Business approved"});

});

module.exports = router;