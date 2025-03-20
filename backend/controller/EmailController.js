const sendEmail = require('../config/mailer');

const sendEmailHandler = async (req, res) => {
    const { to, subject, text, html } = req.body;

    try {
        await sendEmail(to, subject, text, html);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email', error });
    }
};

module.exports = {
    sendEmailHandler
};
