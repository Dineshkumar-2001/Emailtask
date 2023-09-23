const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Configure Nodemailer with your email service provider
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'saisivas200@gmail.com',
    pass: 'jlvy mvjs kbxv qpmj', // Replace with your email password
  },
});

// Endpoint to send emails
app.post('/send-email', async (req, res) => {
  const { name, subject, email } = req.body;

  const mailOptions = {
    from: 'saisivas200@gmail.com',
    to: email,
    subject: subject,
    text: `Hello ${name},\n\nThis is a test email sent from your app.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.sendStatus(200);
  } catch (error) {
    console.error('Error sending email:', error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
