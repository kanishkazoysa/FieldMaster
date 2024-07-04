// routes/contact.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ContactSubmission = require('../models/ContactSubmission');

// Configure transporter with your email service and credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "ugshenali@gmail.com",
    pass: "cpof djmp nwqh kcgw",
  },
});

// Verify the transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Transporter Error:', error);
  } else {
    console.log('Server is ready to send emails');
  }
});

// Function to send email
const sendEmail = (name, email, message) => {
  const mailOptions = {
    from: email,
    to: 'ugshenali@gmail.com',
    subject: 'New Contact Form Submission from FieldMaster',
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('SendMail Error:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

// Route to handle sending email and saving submission
router.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  const newSubmission = new ContactSubmission({
    name,
    email,
    message,
    status: 'pending', // Ensure default status is set correctly
  });

  try {
    await newSubmission.save();
    sendEmail(name, email, message);
    res.status(200).json({ success: 'Submission saved and email sent successfully' });
  } catch (error) {
    console.error('Database Save Error:', error);
    res.status(500).json({ error: 'Failed to save submission', details: error.message });
  }
});

// Route to fetch submissions
router.get('/submissions', async (req, res) => {
  try {
    const submissions = await ContactSubmission.find();
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Fetch Submissions Error:', error);
    res.status(500).json({ error: 'Failed to fetch submissions', details: error.message });
  }
});

module.exports = router;
