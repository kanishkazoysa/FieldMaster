const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },

    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;

const userVerificationSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    
    expiredAt: {
      type: Date,
      default: Date.now,
    },
    
    
  }
);
const userVerificationModel = mongoose.model("userVerification", userVerificationSchema);
module.exports = userVerificationModel;