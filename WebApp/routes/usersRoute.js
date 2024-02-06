const express = require("express");
const router = express.Router();
// const bcrypt = require('bcrypt');
const User = require("../models/user");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }

    const newUser = new User({ email, password });
    const user = await newUser.save();
    res.send("User Registered Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
try{
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "User does not exist"});
  }

  if (password !== user.password) {
    return res.status(400).json({ error: "Invalid credentials." });
  }

  res.send("User Logged In Successfully");
}

catch (error) {
  return res.status(400).json({ error });
}

} );

router.post('/change-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user's password in the database
    user.password = newPassword; // Save the new password as plain text
    await user.save();

    // Password changed successfully
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
