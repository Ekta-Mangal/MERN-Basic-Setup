const express = require('express');
const multer = require('multer');
const { uploadFile, getDataByDate } = require('../controller/DataController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

const upload = multer({ dest: 'uploads/' })

router.post('/upload_file', protect, upload.single('file'), uploadFile);
router.get('/getDataByDate/:date', protect, getDataByDate);

module.exports = router;