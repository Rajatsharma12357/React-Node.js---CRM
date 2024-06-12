const mongoose = require('mongoose');

const htmlSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.ObjectId,
    ref:"USERS",
    required: true
  },
  title: {
    type: String,
    default: "HTML Document",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
}, { timestamps: true });


var htmlModel = mongoose.model('HTML', htmlSchema);

module.exports = htmlModel;