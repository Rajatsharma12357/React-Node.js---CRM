const express = require('express');
const UserController = require('../Controllers/UserController');
const { CheckUserAuth } = require('../middleware/auth');
const { CheckUserAuth2 } = require('../middleware/auth2');
const ProfileController = require('../Controllers/ProfileController');
const router = express.Router();

// Usercontroller
router.post('/register',UserController.register);
router.post('/login',UserController.login);
router.get('/registerUserData',UserController.registerUserData);
router.post('/updateProfile',UserController.updateProfile);
router.post('/me',UserController.getUserDetail);

// router.post('/login',UserController.login2);
// router.post('/updateProfile',UserController.updateProfile2);

//Forgot and Reset Password
// router.post('/forgotPassword',UserController.forgotPassword);
// router.post('/resetpassword/:id/:token',UserController.resetPassword);

router.post('/forgotPassword',UserController.forgotPassword2);
router.post('/resetpassword',UserController.resetPassword);
router.post('/changepassword',ProfileController.changePassword);

//Verify Mail
// router.post('/sendVerifyEmail',ProfileController.sendVerifyEmail);
// router.post('/verifyEmail/:id/:token',ProfileController.verifyEmail);

router.post('/sendVerifyEmail',ProfileController.sendVerifyOtpEmail2);
router.post('/verifyEmail',ProfileController.verifyEmailOtp2);

//Send Email Template
router.post('/sendEmailTemplate',CheckUserAuth,ProfileController.sendEmailTemplate);
router.get('/getEmailTemplate',CheckUserAuth,ProfileController.getEmailTemplate);

// API Delete
router.post('/userdelete/:id', ProfileController.deleteUser);


module.exports = router;