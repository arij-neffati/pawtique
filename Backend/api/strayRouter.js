const express = require("express");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
require('dotenv').config();

const router = express.Router();


if (!process.env.AUTH_MAIL || !process.env.AUTH_PASS) {
    console.error("Missing email credentials in environment variables!");
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_MAIL,
        pass: process.env.AUTH_PASS,
    },
});


transporter.verify(function(error, success) {
    if (error) {
        console.error("Transporter verification failed:", error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

const sendAppointmentEmail = async (formData) => {
  try {
      const templatePath = path.join(__dirname, "../view/stray-confirmation.html");

      if (!fs.existsSync(templatePath)) {
          console.error(`Template not found at: ${templatePath}`);
          throw new Error("Email template missing");
      }

      // Read the template content
      const template = fs.readFileSync(templatePath, 'utf-8');  // <-- Fix here

      const appointmentDate = new Date();
      appointmentDate.setDate(appointmentDate.getDate() + 1);
      appointmentDate.setHours(10, 0, 0);

      const html = template
          .replace("{{name}}", formData.name)
          .replace("{{lastName}}", formData.Lname)
          .replace("{{date}}", appointmentDate.toLocaleDateString())
          .replace("{{time}}", appointmentDate.toLocaleTimeString());

      const mailOptions = {
          from: process.env.AUTH_MAIL,
          to: formData.email,
          subject: "Stray Animal Report - Appointment Confirmation",
          html: html,
      };

      console.log('Attempting to send email to:', formData.email);
      const result = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result);
      return result;
  } catch (error) {
      console.error('Error in sendAppointmentEmail:', error);
      throw error;
  }
};


router.post("/report", async (req, res) => {
  try {
    const formData = req.body;
    console.log('Form Data Received:', formData); // Log the received data to verify

    // Send appointment confirmation email
    await sendAppointmentEmail(formData);
    console.log('Email sent successfully');

    res.status(200).json({
      message: "Appointment email sent successfully",
      data: formData,
    });
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).json({ 
      error: "Failed to send email",
      details: error.message 
    });
  }
});


module.exports = router;