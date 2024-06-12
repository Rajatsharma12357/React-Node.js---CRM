const mongoose = require('mongoose');

const userEmailVerifySchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.ObjectId,
    ref:"USERS",
    // required: true
  },
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
}, { timestamps: true });


var userVerifyModel = mongoose.model('userEmailVerify', userEmailVerifySchema);

module.exports = userVerifyModel;