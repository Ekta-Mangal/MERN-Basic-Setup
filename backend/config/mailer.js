// mailer.js
const nodemailer = require("nodemailer");

// Create a transporter
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
    try {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: process.env.MAIL_USERNAME, // sender address
            to: "jaihind.yadav@cogenteservices.com", // list of receivers
            subject: "test mail", // Subject line
            text: "mail body", // plain text body
            html: "<!DOCTYPE html><html><head><title>Test Email</title></head><body><h1>Hello, World!</h1><p>This is a test email with HTML content.</p><p>Visit <a href='https://www.example.com'>our website</a> for more information.</p></body></html>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email: %s", error);
        throw error;
    }
};

module.exports = sendEmail;
