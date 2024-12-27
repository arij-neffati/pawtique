const express = require("express");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const router = express.Router();

// Setup the nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail", // Adjust based on your email service
    auth: {
        user: process.env.AUTH_MAIL,
        pass: process.env.AUTH_PASS,
    },
});

// Function to send the appointment email
const sendAppointmentEmail = async (formData) => {
    const template = fs.readFileSync(
        path.join(__dirname, "../view/stray-confirmation.html"),
        "utf8"
    );

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

    return transporter.sendMail(mailOptions);
};

// Define a route to handle stray report form submission
router.post("/report", async (req, res) => {
    try {
        const formData = req.body; // Assuming form data is sent as JSON in the request body
        await sendAppointmentEmail(formData);

        res.status(200).json({
            message: "Appointment email sent successfully",
            data: formData,
        });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

module.exports = router;
