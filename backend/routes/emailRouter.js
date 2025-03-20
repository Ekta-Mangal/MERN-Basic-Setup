const express = require('express');
const { sendEmailHandler } = require('../controller/EmailController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/send', protect, sendEmailHandler);

module.exports = router;