const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const CheckUserAuth = async (req, res, next) => {

  try {
    const { token } = req.cookies;
    // res.send(token)
    if (!token) {
      res.status(401).json({
        'status': 'failed',
        'message': "Unauthorized user, no token"
      })
      return
    }
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await userModel.findById(data.userId)
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

module.exports = { CheckUserAuth, AuthRoles };