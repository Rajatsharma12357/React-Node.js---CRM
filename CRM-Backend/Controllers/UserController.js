const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerSchema } = require("../helpers/registerValidationSchema");
const { loginSchema } = require("../helpers/loginValidationSchema");
const { sendResetPasswordLinkMail, sendVerifyLinkMail, sendEmailTemplate } = require("./MailController");
const { resetPasswordSchema } = require("../helpers/resetPasswordSchema");
const { forgotPasswordSchema } = require("../helpers/forgotPasswordSchema");
const htmlModel = require("../models/htmlModel");
const emailTemplate = require("../constant/emailTemplate");
const { encode, decode } = require('html-entities');
const querystring = require('querystring');
const { updateProfileValidation } = require("../helpers/updateProfileValidation");
const changePasswordSchema = require("../helpers/changePasswordSchema");


class UserController {

    static register = async (req, res) => {
        try {
            // console.log(req.body);
            const { firstName, lastName, email, password, confirmPassword } = req.body;
            const isExist = await userModel.findOne({ email: email });

            if (isExist && !isExist.deleted) {
                return res.status(400).json({
                    status: "failed",
                    message: "ᴛʜɪꜱ ᴇᴍᴀɪʟ ɪꜱ ᴀʟʀᴇᴀᴅʏ ᴇxɪꜱᴛꜱ😓",
                });
            } else {
                if (isExist && isExist.deleted) {

                    isExist.firstName = firstName;
                    isExist.lastName = lastName;
                    isExist.password = await bcrypt.hash(password.toString(), 10);
                    isExist.deleted = false;
                    await isExist.save();
                    return res.status(200).json({
                        status: "success",
                        message: "User restored and updated successfully. Please login!"
                    });
                }
                const result = await registerSchema.validateAsync(req.body)
                // console.log("result => ",result);
                try {
                    const pass = password.toString();
                    const hashpassword = await bcrypt.hash(pass, 10);
                    const result = await userModel({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: hashpassword,
                    });
                    await result.save();
                    return res.status(201).json({
                        status: "success",
                        message: "Registration Successfully, Please Do Login!"
                    });
                } catch (err) {
                    console.log(err);
                    return res.status(400).json({ status: "failed", message: `${err}` });
                }

            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({ status: "failed", message: `${error}` });
        }
    }

    static login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const result = await loginSchema.validateAsync(req.body)
            // console.log("result => ", result);
            const user = await userModel.findOne({ email: email });
            if (user != null) {
                if (user.deleted) {
                    return res.status(400).json({
                        status: "failed",
                        message: "Your account has been deactivated. Please contact support.",
                    });
                }

                const isMatched = await bcrypt.compare(password, user.password);
                if (user.email === email && isMatched) {
                    // Generate JWT
                    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
                    // Store token in user document
                    user.token = token;
                    await user.save();

                    // console.log(token);
                    res.cookie("token", token);
                    return res.status(200).json({
                        status: "success",
                        message: "login successfully, Wait for a moment Redirecting it! 😃🍻",
                        token: token,
                        user
                    });
                } else {
                    return res.status(400).json({
                        status: "failed",
                        message: "Email or Password is not Valid 😓",
                    });
                }
            } else {
                return res.status(400).json({
                    status: "failed",
                    message: "You are not registered user 😓",
                });
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({ status: "failed", message: `${error}` });
        }
    }

    static login2 = async (req, res) => {
        try {
            const { email, password } = req.body;
            const result = await loginSchema.validateAsync(req.body)
            // console.log("result => ", result);
            const user = await userModel.findOne({ email: email });
            if (user != null) {
                const isMatched = await bcrypt.compare(password, user.password);
                if (user.email === email && isMatched) {
                    // Generate JWT
                    return res.status(200).json({
                        status: "success",
                        message: "login successfully 😃🍻",
                        user
                    });
                } else {
                    return res.status(400).json({
                        status: "failed",
                        message: "Email or Password is not Valid 😓",
                    });
                }
            } else {
                return res.status(400).json({
                    status: "failed",
                    message: "You are not registered user 😓",
                });
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({ status: "failed", message: `${error}` });
        }
    }

    static getUserDetail = async (req, res) => {
        try {
            // console.log("req.user => ",req.user);
            const isExist = await userModel.findById(req.body._id);
            if (isExist) {
                return res.status(200).json({
                    status: "success",
                    user: isExist,
                });
            } else {
                return res.status(400).json({ status: "failed", message: "No User Found" });
            }
        } catch (error) {
            console.log(error);
            return res.status(400).json({ status: "failed", message: `${error}` });
        }
    };

    static registerUserData = async (req, res) => {
        try {
            const data = await userModel.find();
            return res.status(200).json({
                status: "success",
                message: "Data Fetched Succesfully",
                data: data
            });
        } catch (error) {
            console.log("error => ", error)
            return res.status(500).json({
                status: "failed",
                message: "Something went Wrong!",
                data: data
            });
        }
    }

    static updateProfile = async (req, res) => {
        // const userId = req.params.id;
        const updateData = req.body;
        try {
            await updateProfileValidation.validateAsync(req.body);
            const isExist = await userModel.findById(req.body._id);
            if (isExist?.token) {
                await jwt.verify(isExist.token, process.env.JWT_SECRET_KEY);
                if (isExist) {
                    const user = await userModel.findByIdAndUpdate(req.body._id, updateData, { new: true });
                    res.status(200).json({ status: "success", message: 'User profile updated successfully', user });
                } else {
                    return res.status(400).json({ status: "failed", message: 'User not found' });
                }
            } else {
                return res.status(400).json({ status: "failed", message: `Do login first` });
            }

        } catch (error) {
            console.log(error)
            return res.status(400).json({ status: "failed", message: `${error}` });
        }
    }

    static updateProfile2 = async (req, res) => {
        // const userId = req.params.id;
        const updateData = req.body;
        try {
            await updateProfileValidation.validateAsync(req.body);
            const user = await userModel.findById(req.body._id);
            if (user?._id) {
                if (user) {
                    const updatedUser = await userModel.findByIdAndUpdate(req.body._id, updateData, { new: true });
                    res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
                } else {
                    return res.status(400).json({ message: 'User not found' });
                }
            } else {
                return res.status(400).json({ status: "failed", message: `Do login first` });
            }

        } catch (error) {
            console.log(error)
            return res.status(400).json({ status: "failed", message: `${error}` });
        }
    }

    static forgotPassword = async (req, res) => {
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

            const link = `http://localhost:3000/reset-password/${user._id}/${token}`
            console.log("link => ", link);

            //3. Send Reset Password Link 
            const mailSent = await sendResetPasswordLinkMail(req.body.email, link);

            if (mailSent) {
                return res.status(200).json({
                    status: "success",
                    message: 'Reset Password link has been Sent Successfully in your Mail'
                });
            } else {
                return res.status(400).json({
                    status: "failed",
                    message: 'Failed to send email'
                });
            }
        } catch (error) {
            return res.status(400).json({ status: "failed", message: `${error}` });
        }
    }

    static forgotPassword2 = async (req, res) => {
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

            const link = `http://localhost:3000/resetpassword/${user._id}`
            console.log("link => ", link);

            //3. Send Reset Password Link 
            const mailSent = await sendResetPasswordLinkMail(req.body.email, link);

            if (mailSent) {
                return res.status(200).json({
                    status: "success",
                    message: 'Reset Password link has been Sent Successfully in your Mail'
                });
            } else {
                return res.status(400).json({
                    status: "failed",
                    message: 'Failed to send email'
                });
            }
        } catch (error) {
            return res.status(400).json({ status: "failed", message: `${error}` });
        }
    }


    static resetPassword = async (req, res) => {

        const { id, password, confirmPassword } = req.body;
        try {
            const user = await userModel.findOne({ _id: id });
            if (!user) {
                return res.status(400).json({
                    status: "failed",
                    message: "We Could not find the user with given email! 😓",
                });
            }

            if (password == confirmPassword) {
                // Validating Change Password Fields
                const result = await resetPasswordSchema.validateAsync(req.body);
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

        } catch (error) {
            return res.status(400).json({ status: "failed", message: `${error}` });
        }
    }

    static resetPassword2 = async (req, res) => {
        const { id, token } = req.params;
        const { password, confirmPassword } = req.body;
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
            if (password == confirmPassword) {
                // Validating Change Password Fields
                const result = await resetPasswordSchema.validateAsync(req.body);
                // Hashing the Password
                const encryptedPassword = await bcrypt.hash(password, 10);
                // Updating the user
                await user.updateOne({ _id: id, }, { $set: { password: encryptedPassword } });

                // User Password update
                return res.status(200).json({
                    status: "success",
                    message: "Password Updated, DO login"
                })
            } else {
                return res.status(400).json({
                    status: "failed",
                    message: "Password and Confirm Password Must be Same! 😓",
                });
            }

        } catch (error) {
            return res.status(400).json({ status: "failed", message: `${error}` });
        }
    }

}
module.exports = UserController;