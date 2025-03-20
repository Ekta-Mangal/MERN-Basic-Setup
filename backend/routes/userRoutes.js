const express = require('express');
const { registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);


module.exports = router;
