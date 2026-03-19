const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: "user"
  },

  businessName: String,
  ownerName: String,
  phone: String,
  registrationNumber: String,

  status: {
    type: String,
    default: "pending"
  }

});

module.exports = mongoose.model("User", UserSchema);