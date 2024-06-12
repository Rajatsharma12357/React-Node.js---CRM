const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const CheckUserAuth2 = async (req, res, next) => {

  try {
      const data =  await userModel.findById(data.userId);
    // res.send(token)
    if (!data) {
      res.status(401).json({
        'status': 'failed',
        'message': "Unauthorized user, No user Found!"
      })
      return
    }
    req.user = data;
    next()
  } catch (error) {
    res.send(error);
  }
};

const AuthRoles = (roles) => {
  return (req, res, next) => {
    console.log(roles);
  };
};

module.exports = { CheckUserAuth2, AuthRoles };