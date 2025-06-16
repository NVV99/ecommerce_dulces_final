const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// GET /api/users/me
router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
