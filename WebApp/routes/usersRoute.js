const express = require("express");
const router = express.Router();
const userEmailVerificationModel = require("../models/userEmailVerification");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { PassThrough } = require("nodemailer/lib/xoauth2");
const auth = require("../middleware/middleware");
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

const upload = multer({ storage: multer.memoryStorage() });

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kanishkazoysa1234@gmail.com",
    pass: "sldh spke vqbu znhw",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else console.log("Server is ready to take messages");
});

// register a new user
router.post("/register", async (req, res) => {
  const { email, password , fName ,lName } = req.body;
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
  const expiredAt = new Date(createdAt.getTime() + 5 * 60000);
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
      if (existingUser.isVerified) {
        return res
          .status(400)
          .json({ error: "User with this email already exists." });
      } else {
        //delete the user
        await User.findOneAndDelete({
          email: existingUser.email,
        });
      }
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    const newUser = new User({ email, password, lname: lName, fname: fName });
    await newUser.save();

    res.status(200).send({
      success: true,
      message: "User Register Successfull",
      newUser,
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/emailVerification/:email/:VerifyId", async (req, res) => {
  const { email, VerifyId } = req.params;
  try {
    const user = await userEmailVerificationModel.findOne({ email, VerifyId });
    if (!user) {
      return res.redirect(
        `http://localhost:3000/emailVerification?message=User does not exist&verified=false`
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
      return res.redirect(
        `http://localhost:3000/emailVerification?message=Email verification failed!&verified=false`
      );
    }
    console.log("Email is valid");
    //update the user as verified
    await User.findOneAndUpdate({ email }, { isVerified: true });
    // delte the user from the database
    await userEmailVerificationModel.findOneAndDelete({ email });
    res.redirect(
      `http://localhost:3000/emailVerification?message=Email verified&verified=true`
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

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const isVerified = user.isVerified;
    if (!isVerified) {
      return res.status(400).json({ error: "User is not verified." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Update the user token
    await User.findOneAndUpdate({ email }, { token: token });
    res.status(200).send({
      success: true,
      token: token,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ error: error.message || "An error occurred" });
  }
});


router.post("/change-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).send({
      success: true,
    });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



//get user details
router.get('/details', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }
    res.send({ success: true, user });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
});


//update user profile with upload photo
router.post('/updateProfile', auth, upload.single('photo'), async (req, res) => {
  if (!req.body.user) {
    return res.status(400).send({ success: false, message: 'User data not provided' });
  }

  let userUpdate;
  try {
    userUpdate = JSON.parse(req.body.user);
  } catch (error) {
    return res.status(400).send({ success: false, message: 'Invalid user data' });
  }

  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(404).send({ success: false, message: 'User not found' });
  }

  if (req.file) {
    try {
      const formData = new FormData();
      formData.append('image', req.file.buffer.toString('base64'));

      const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
        headers: formData.getHeaders(),
        params: {
          key: 'a08fb8cde558efecce3f05b7f97d4ef7' // Replace with your ImageBB API key
        }
      });

      user.imageUrl = response.data.data.url;
    } catch (error) {
      console.error('Error uploading image to ImageBB:', error);
      return res.status(500).send({ success: false, message: 'Error uploading image' });
    }
  }

  user.fname = userUpdate.fname || user.fname;
  user.lname = userUpdate.lname || user.lname;
  user.email = userUpdate.email || user.email;

  try {
    await user.save();
    res.send({ success: true, user });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
});

router.post('/removeProfilePicture', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    // If there's an existing image URL, you might want to delete it from ImageBB here
    // This would require making an API call to ImageBB's deletion endpoint

    user.imageUrl = null;
    await user.save();

    res.send({ success: true, message: 'Profile picture removed successfully' });
  } catch (error) {
    console.error('Error removing profile picture:', error);
    res.status(500).send({ success: false, message: 'Server error' });
  }
});

module.exports = router;
