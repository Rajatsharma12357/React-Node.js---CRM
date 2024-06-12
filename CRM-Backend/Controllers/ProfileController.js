const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendResetPasswordLinkMail, sendVerifyEmail, sendEmailTemplate } = require("./MailController");
const { resetPasswordSchema } = require("../helpers/resetPasswordSchema");
const { forgotPasswordSchema, verificationEmailSchema } = require("../helpers/forgotPasswordSchema");
const htmlModel = require("../models/htmlModel");
const emailTemplate = require("../constant/emailTemplate");
const querystring = require('querystring');
const changePasswordSchema = require("../helpers/changePasswordSchema");
const userVerifyModel = require("../models/userEmailVerify");
const crypto = require('crypto');
const generateOtp = () => {
    return crypto.randomInt(100000, 999999).toString();
};

class ProfileController {
    static sendVerifyEmail = async (req, res) => {
        try {
            // 1. GET USER BASED ON POSTED EMAIL
            console.log("email => ", req.body.email);
            await forgotPasswordSchema.validateAsync(req.body);
            const user = await userModel.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({
                    status: "failed",
                    message: "We Could not find the user with given email! 😓",
                });
            }

            //2. GENERATE A RANDOM RESET TOKEN
            const secret = `${process.env.JWT_SECRET_KEY} + ${user.password}`;
            const token = jwt.sign({ email: user.email, id: user._id }, secret, {
                expiresIn: '24h',
            })

            const link = `http://localhost:3000/verifyEmail/${user._id}/${token}`
            console.log("link => ", link);

            //3. Send Reset Password Link 
            const mailSent = await sendVerifyLinkMail(req.body.email, link);

            if (mailSent) {
                return res.status(200).json({ message: 'Verify Email, Link has been sent into your Mail' });
            } else {
                return res.status(400).json({ message: 'Not Verified!' });
            }
        } catch (error) {
            console.log("error => ", error);
        }
    }

    static sendVerifyOtpEmail2 = async (req, res) => {
        try {
            // 1. GET USER BASED ON POSTED EMAIL
            console.log("email => ", req.body.email);
            await verificationEmailSchema.validateAsync(req.body);
            const user = await userModel.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({
                    status: "failed",
                    message: "We Could not find the user with given email! 😓",
                });
            }
            // Function to generate OTP
            const generatedOtp = await generateOtp();
            const verifyUser = await userVerifyModel.findOne({ email: req.body.email });

            if (verifyUser) {
                verifyUser.otp = generatedOtp;
                await verifyUser.save();
            } else {
                const result = await userVerifyModel({
                    email: req.body.email,
                    otp: generatedOtp,
                });
                await result.save();
            }


            const link = `http://localhost:3000/verifyEmail/${user._id}`

            //3. Send Reset Password Link 
            const mailSent = await sendVerifyEmail(req.body.email, link, generatedOtp);

            if (mailSent) {
                return res.status(200).json({ status: "success", message: 'Verify Email, OTP has been sent into your Mail' });
            } else {
                return res.status(400).json({ status: "failed", message: 'Not Verified!' });
            }
        } catch (error) {
            console.log("error => ", error);
            return res.status(400).json({ status: "failed", message: 'Something went Wrong!' });
        }
    }

    static verifyEmail = async (req, res) => {
        const { id, token } = req.params;
        try {
            const user = await userModel.findOne({ _id: id });
            if (!user) {
                return res.status(400).json({
                    status: "failed",
                    message: "We Could not find the user with given email! 😓",
                });
            }

            const secret = `${process.env.JWT_SECRET_KEY} + ${user.password}`;
            const verify = jwt.verify(token, secret);
            if (!verify) {
                return res.status(400).json({
                    status: "failed",
                    message: "Invalid URL, Please go back and re-generate URL 😓",
                });
            }
            user.verified = true;
            // Save the updated user record back to the database
            await user.save();

            return res.status(200).json({ message: 'User Verified' });

        } catch (error) {
            return res.status(400).json({ status: "failed", message: `${error}` });
        }
    }

    static verifyEmailOtp2 = async (req, res) => {
        const { email, otp } = req.body;

        try {
            // Find user and OTP records in parallel
            const [user, result] = await Promise.all([
                userModel.findOne({ email }),
                userVerifyModel.findOne({ email })
            ]);

            if(user.verified){
                return res.status(400).json({
                    status: "failed",
                    message: "User is already verified!"
                });
            }

            if (!user) {
                return res.status(400).json({
                    status: "failed",
                    message: "No user found! 😓"
                });
            }

            if (!result) {
                return res.status(400).json({
                    status: "failed",
                    message: "Please send the OTP once again! 😓"
                });
            }

            if (result.otp === otp) {
                user.verified = true;
                result.otp = "";

                await Promise.all([user.save(), result.save()]);

                return res.status(200).json({
                    status: "success",
                    message: 'OTP verified!'
                });
            } else {
                return res.status(400).json({
                    status: "failed",
                    message: 'Invalid OTP'
                });
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            return res.status(500).json({
                status: "failed",
                message: 'An error occurred while verifying the OTP.'
            });
        }
    }


    static sendEmailTemplate = async (req, res) => {
        try {

            // 1. GET USER BASED ON POSTED EMAIL
            await forgotPasswordSchema.validateAsync(req.body);
            const user = await userModel.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({
                    status: "failed",
                    message: "We Could not find the user with given email! 😓",
                });
            }

            const result = await htmlModel({
                user: req.user._id,
                // content: encode(emailTemplate),
                content: emailTemplate
            });
            await result.save();

            //3. Send Email Template to the respected user 
            const mailSent = await sendEmailTemplate(req.body.email);

            if (mailSent) {
                return res.status(200).json({ message: 'Email has been send successfully!' });
            } else {
                return res.status(400).json({ message: 'Failed to send email' });
            }
        } catch (error) {
            return res.status(400).json({ status: "failed", message: `${error}` });
        }
    }

    static getEmailTemplate = async (req, res) => {
        try {
            const user = await htmlModel.findOne({ user: req.user._id });
            if (!user) {
                return res.status(400).json({
                    status: "failed",
                    message: "We Could not find the Email Template! 😓",
                });
            }
            // return res.status(200).json({ message: 'Email Template fetched successfully!',content:decode(user.content,{level: 'html5'}) });
            return res.status(200).json({ message: 'Email Template fetched successfully!', content: querystring.unescape(user.content) });
        } catch (error) {
            return res.status(400).json({ status: "failed", message: `${error}` });
        }
    }

    static deleteUser = async (req, res) => {
        try {
            const user = await userModel.findById(req.params.id);
            if (!user) {
                return res.status(400).json({ status: "failed", message: 'User not found' });
            }
            if (user && !user.deleted) {
                await userModel.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
                res.status(200).json({ status: "success", message: 'User deleted successfully' });
            } else {
                return res.status(400).json({ status: "failed", message: 'Account has already been deleted' });
            }
        } catch (err) {
            return res.status(500).json({ message: 'failed', error: err.message });
        }
    }

    static changePassword = async (req, res) => {
        const { id, oldPassword, password, confirmPassword } = req.body;
        try {
            await changePasswordSchema.validateAsync(req.body);

            const user = await userModel.findOne({ _id: id });
            if (!user) {
                return res.status(400).json({
                    status: "failed",
                    message: "We Could not find the user with given email! 😓",
                });
            }
            const isMatched = await bcrypt.compare(oldPassword, user.password);

            if (oldPassword === password) {
                return res.status(400).json({
                    status: "failed",
                    message: "New Password should not be the same as the old Password.😓",
                });
            }
            if (!isMatched) {
                return res.status(400).json({
                    status: "failed",
                    message: "Old Password does not match! 😓",
                });
            } else {
                if (password == confirmPassword) {
                    // Validating Change Password Fields
                    await changePasswordSchema.validateAsync(req.body);

                    // Hashing the Password
                    const encryptedPassword = await bcrypt.hash(password, 10);
                    // Updating the user
                    await user.updateOne({ _id: id, }, { $set: { password: encryptedPassword } });

                    // User Password update
                    return res.status(200).json({
                        status: "success",
                        message: "Password Updated, Please do login"
                    })
                } else {
                    return res.status(400).json({
                        status: "failed",
                        message: "Password and Confirm Password Must be Same! 😓",
                    });
                }
            }


        } catch (error) {
            return res.status(400).json({ status: "failed", message: `${error}` });
        }
    }

}


module.exports = ProfileController;