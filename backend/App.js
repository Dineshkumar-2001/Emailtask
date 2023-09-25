const express = require('express');
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

const db = mysql.createConnection({
  host: 'localhost',
  user:  'root',
  password: '', // Replace with your database password
  database: 'emailuser',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

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
app.post('/submit-form', (req, res) => {
  const { name, subject, email } = req.body;

  // Insert data into the database
  const sql = 'INSERT INTO userdata (name, subject, email) VALUES (?, ?, ?)';
  db.query(sql, [name, subject, email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Send email
    const mailOptions = {
      from: 'saisivas200@gmail.com',
      to: email,
      subject: subject,
      text: `Hello ${name},\n\nThis is a test email sent from your app.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Email sending failed');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Form submitted successfully');
      }
    });
  });
});

// Add this route in your Node.js server
app.get('/fetch-data', (req, res) => {
  const sql = 'SELECT * FROM userdata'; // Replace 'userdata' with your actual table name
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
