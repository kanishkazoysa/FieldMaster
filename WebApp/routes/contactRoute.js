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

// Function to reply to an email
const replyEmail = (toEmail, replyMessage) => {
  const mailOptions = {
    from: 'ugshenali@gmail.com',
    to: toEmail,
    subject: 'Reply from FieldMaster',
    text: replyMessage,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('SendMail Error:', error);
    } else {
      console.log('Reply email sent: ' + info.response);
    }
  });
};

// Route to handle sending email and saving submission
router.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  // Create a new instance of ContactSubmission
  const newSubmission = new ContactSubmission({
    name,
    email,
    message,
    status: 'new',
  });

  try {
    // Save the submission to the database
    await newSubmission.save();

    // Send email to your email address
    sendEmail(name, email, message);

    // Respond to client
    res.status(200).json({ success: 'Submission saved and email sent successfully' });
  } catch (error) {
    console.error('Database Save Error:', error);
    res.status(500).json({ error: 'Failed to save submission', details: error.message });
  }
});

// Route to fetch all contact submissions
router.get('/submissions', async (req, res) => {
  try {
    const submissions = await ContactSubmission.find();
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Database Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch submissions', details: error.message });
  }
});

// Route to handle replying to a contact submission
router.post('/reply', async (req, res) => {
  const { id, toEmail, replyMessage } = req.body;

  try {
    // Send reply email
    replyEmail(toEmail, replyMessage);

    // Update submission status
    await ContactSubmission.findByIdAndUpdate(id, { status: 'replied' });

    // Respond to client
    res.status(200).json({ success: 'Reply email sent and status updated successfully' });
  } catch (error) {
    console.error('Reply Email Error:', error);
    res.status(500).json({ error: 'Failed to send reply email', details: error.message });
  }
});

module.exports = router;
