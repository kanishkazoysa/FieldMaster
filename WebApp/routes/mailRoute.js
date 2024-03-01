const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
// const formData = require("form-data");
// const Mailgun = require("mailgun.js");
const User = require("../models/user");
const userVerificationSchema = require("../models/userVerification");
// const API_KEY = "730e60442716fcae468c296398272c4f-8c90f339-d99a8e17";
// const DOMAIN = "sandbox1a76532aacd4416188f2f79fde12a6bc.mailgun.org";
// const mailgun = new Mailgun(formData);
// const client = mailgun.client({ username: "api", key: API_KEY });

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kanishkazoysa1234@gmail.com",
    pass: "babx gpyj vvyx kpkp",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else console.log("Server is ready to take messages");
});

const sendOtpEmail = async (email, otp) => {
  // const otp=  Math.floor(100000 + Math.random() * 900000);
  const mailOptions = {
    from: "kanishkazoysa1234@gmail.com",
    to: email,
    subject: "Your OTP Code",
    html: `Your OTP code is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  return otp;
};

router.post("/otp", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const userOtp = await userVerificationSchema.findOne({ email });
    console.log("userOtp", userOtp);

    if (userOtp) {
      console.log("userOtpljioij", userOtp);
      await userVerificationSchema.findOneAndDelete({ email });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    sendOtpEmail(email, otp);
    const createdAt = new Date();
    const expiredAt = new Date(createdAt.getTime() + 1 * 60000);
    const newUser = new userVerificationSchema({
      email,
      otp,
      createdAt,
      expiredAt,
    });
    await newUser.save();
    console.log(otp);
    res.status(200).json({ otp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { email, enteredOTP } = req.body;
    console.log(email, enteredOTP);
    const user = await userVerificationSchema.findOne({ email, enteredOTP });
    if (!user) {
      console.log("OTP expired or invalid");
      return res.status(400).json({ error: "OTP expired or invalid" });
    }
    if (enteredOTP != user.otp) {
      console.log("Invalid OTP");
      return res.status(400).json({ error: "Invalid OTP" });
    }
    const currentTime = new Date();
    if (currentTime > user.expiredAt) {
      console.log("OTP has expired");
      // delte the user from the database
      await userVerificationSchema.findOneAndDelete({ email });
      return res.status(400).json({ error: "OTP has expired" });
    }
    console.log("OTP is valid");
    // delte the user from the database
    await userVerificationSchema.findOneAndDelete({ email });
    res.status(200).json({ message: "OTP is valid" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// const generateOTP = async () => {
//   const otp = Math.floor(100000 + Math.random() * 900000);

//   return otp;
// };

// async function sendOtpEmail(email, otp) {
//   const messageData = {
//     from: "<kanishkazoysa1234@gmail.com>",
//     to: email,
//     subject: "Your OTP Code",
//     html: `Your OTP code is: ${otp}`,
//   };

//   await client.messages.create(DOMAIN, messageData);
// }

module.exports = router;
