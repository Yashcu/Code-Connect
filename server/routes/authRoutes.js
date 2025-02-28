const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', (req, res) => {
  // Login logic here
  res.send('Login route');
});

module.exports = router;