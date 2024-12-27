const fs = require('fs');
const path = require('path');

const sendAppointmentEmail = async (formData) => {
    const template = fs.readFileSync(path.join(__dirname, '../view/stray-confirmation.html'), 'utf8');
    const appointmentDate = new Date();
    appointmentDate.setDate(appointmentDate.getDate() + 1);
    appointmentDate.setHours(10, 0, 0);

    const html = template
        .replace('{{name}}', formData.name)
        .replace('{{lastName}}', formData.Lname)
        .replace('{{date}}', appointmentDate.toLocaleDateString())
        .replace('{{time}}', appointmentDate.toLocaleTimeString());

    const mailOptions = {
        from: process.env.AUTH_MAIL,
        to: formData.email,
        subject: "Stray Animal Report - Appointment Confirmation",
        html: html
    };

    return transporter.sendMail(mailOptions);
};