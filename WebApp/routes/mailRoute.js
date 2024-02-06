const express = require("express");
const router = express.Router();
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const User = require("../models/user");
const API_KEY = "730e60442716fcae468c296398272c4f-8c90f339-d99a8e17";
const DOMAIN = "sandbox1a76532aacd4416188f2f79fde12a6bc.mailgun.org";

const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: "api", key: API_KEY });

router.post("/otp", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const otp = generateOTP();

    await sendOtpEmail(email, otp);

    res.status(200).json({ otp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

async function sendOtpEmail(email, otp) {
  const messageData = {
    from: "<kanishkazoysa1234@gmail.com>",
    to: email,
    subject: "Your OTP Code",
    html: `Your OTP code is: ${otp}`,
  };

  await client.messages.create(DOMAIN, messageData);
}

module.exports = router;
