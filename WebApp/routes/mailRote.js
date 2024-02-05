router.post("/otp", async (req, res) => {
    try {
      const { email } = req.body;
  
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
      from: 'kanishkazoysa1234@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    };
  
    await client.messages.create(DOMAIN, messageData);
  }
  
  module.exports = router;