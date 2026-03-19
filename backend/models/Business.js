const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  businessName: String,
  ownerName: String,
  email: String,
  password: String,
  approved: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Business", businessSchema);