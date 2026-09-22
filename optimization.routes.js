const express = require('express');
const router = express.Router();
const { optimizeCodeController } = require('./optimization.control');
const verifyToken = require('./middleware/authMiddleware'); // 1. Middleware ko import kiya

// Optimization Endpoint Route (🔒 verifyToken lagane se yeh secure ho gaya hai)
router.post('/optimize', verifyToken, optimizeCodeController);

module.exports = router;