const nodeMailer = require('nodemailer');
const emailTemplate = require('../constant/emailTemplate');

class smtpController {
  static sendResetPasswordLinkMail = async (email, link) => {
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: process.env.smtpUser,
        pass: process.env.smtpUserPassword
      }
    })
    const mailOptions = {
      from: `Testing CRM Mail <${process.env.smtpUser}>`,
      to: `${email}`,
      subject: `Reset Your Password `,
      text: "This is am email using nodemailer in nodejs?",
      html: `Welcome to CRM Application </br> <h1>Here is your
            Reset password Link</h1> <a href=${link}>${link}</a> </br> </br>
            <span>If it is not clickable copy this and paste it into your broswer</span> </br> </br>
            <h2>Link will expire in 24 hours!</h2>`
    }
    try {
      let info = await transporter.sendMail(mailOptions);
      // console.log("info => " + info);
      return true;
    } catch (error) {
      console.log("Email failed: " + error)
    }
  }

  static sendVerifyEmail = async (email, link, otp) => {
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: process.env.smtpUser,
        pass: process.env.smtpUserPassword
      }
    })
    const mailOptions = {
      from: `Testing CRM Mail <${process.env.smtpUser}>`,
      to: `${email}`,
      subject: `Verify Your Email `,
      text: "This is am email using nodemailer in nodejs?",
      html: `Welcome to CRM Application </br> <h1>
      ${otp} is your OTP to validate your number with CRM. Use this to verify your Email and start exploring more. Team Kodegurus.
            `
    }
    try {
      let info = await transporter.sendMail(mailOptions);
      // console.log("info => " + info);
      return true;
    } catch (error) {
      console.log("Email failed: " + error)
    }
  }

  static sendEmailTemplate = async (email) => {
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: process.env.smtpUser,
        pass: process.env.smtpUserPassword
      }
    })
    // const myEmailTemplate = template || emailTemplate;

    const mailOptions = {
      from: `Kodegurus CRM Mail <${process.env.smtpUser}>`,
      to: `${email}`,
      subject: `Email template `,
      text: "This is am email using nodemailer in nodejs?",
      html: `Welcome to CRM Application </br></br>
            ${emailTemplate} `
      // ${myEmailTemplate} `
    }
    try {
      let info = await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.log("Email failed: " + error)
    }
  }

}
module.exports = smtpController;