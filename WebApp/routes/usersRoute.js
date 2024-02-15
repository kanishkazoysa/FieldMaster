const express = require("express");
const router = express.Router();
const userEmailVerificationModel = require("../models/userEmailVerification");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

// const bcrypt = require('bcrypt');
const User = require("../models/user");

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

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const VerifyId = uuidv4();

  const mailOptions = {
    from: "kanishkazoysa1234@gmail.com",
    to: email,
    subject: "FieldMaster Email Verification",
    html: `
      <div style="text-align: center;">
        <img src="https://drive.google.com/uc?export=view&id=180piTLBcaAil8Nfn7hcmADai01Wej4XJ" alt="FieldMaster Logo" style="width: 200px;"/>
        <h1>Welcome to FieldMaster</h1>
        <p>Click the link below to verify your FieldMaster account:</p>
        <a href="http://localhost:5000/api/users/emailVerification/${email}/${VerifyId}" style="background-color: #4CAF50; color: white; padding: 14px 20px; text-align: center; text-decoration: none; display: inline-block;">Verify</a>
      </div>
    `,
  };
  const createdAt = new Date();
  const expiredAt = new Date(createdAt.getTime() + 1 * 60000);
  const newUser = new userEmailVerificationModel({
    email,
    VerifyId,
    createdAt,
    expiredAt,
  });
  await newUser.save();
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if(existingUser.isVerified)
      {
        return res
        .status(400)
        .json({ error: "User with this email already exists." });
        
      }
      else{
        //delete the user
        await User.findOneAndDelete({
          email:existingUser.email
        })
      }
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }


    const newUser = new User({ email, password });
    await newUser.save();
    res.send("User Registered Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/emailVerification/:email/:VerifyId", async (req, res) => {
  const { email, VerifyId } = req.params;
  try {
    const user = await userEmailVerificationModel.findOne({ email, VerifyId });
    if (!user) {
      // return res.status(400).json({ error: "User does not exist" });
      return res.redirect(
        `http://localhost:3000/emailVerification?message={"User does not exist"}&verified=false`
      );
    }
    if (VerifyId != user.VerifyId) {
      console.log("Invalid Email");
      return res.status(400).json({ error: "Invalid Email" });
    }
    const currentTime = new Date();
    if (currentTime > user.expiredAt) {
      console.log("Email has expired");
      // delte the user from the database
      await userEmailVerificationModel.findOneAndDelete({ email });
      return res.status(400).json({ error: "Email has expired" });
    }
    console.log("Email is valid");
    //update the user as verified
    await User.findOneAndUpdate({ email }, { isVerified: true });
    // delte the user from the database
    await userEmailVerificationModel.findOneAndDelete({ email });

    // res.status(200).json({ message: "OTP is valid" });
    res.redirect(
      `http://localhost:3000/emailVerification?message={"email verified"}&verified=true`
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isVerified = user.isVerified;
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid credentials." });
    }
    if (!isVerified) {
      return res.status(400).json({ error: "User is not verified." });
    }

    res.send("User Logged In Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/change-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user's password in the database
    user.password = newPassword; // Save the new password as plain text
    await user.save();

    // Password changed successfully
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
