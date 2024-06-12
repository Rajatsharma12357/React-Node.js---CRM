const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required:true,
  },
  lastName: {
    type: String,
    required:true,
  },
  email: {
    type: String,
    required:true,
  },
  password: {
    type: String,
    required:true,
  },
  token:{
    type:String,
    default:"",
  },
  role: {
    type: String,
    default: 'user',
    required:true,
  },
  verified: {
    type: Boolean,
    required:true,
    default: false,
  },
  postalCode:{
    type: String,
    default: ""
  },
  number:{
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  userAddress: {
    address:{
      type: String,
      default: ""
    },
    country:{
      type: String,
      default: ""
    },
    state:{
      type: String,
      default: ""
    },
    city:{
      type: String,
      default: ""
    },
  },
  updatedAt: {
    type: Date,
  },
},{timestamps:true});


var userModel = mongoose.model('USERS', userSchema);

module.exports = userModel;