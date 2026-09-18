const express = require('express');
const router = express.Router();
const { optimizeCodeController } = require('./optimization.control');

// Optimization Endpoint Route
router.post('/optimize', optimizeCodeController);

module.exports = router;