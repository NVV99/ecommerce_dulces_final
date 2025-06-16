// backend/routes/orders.js

const express = require('express');
const { body } = require('express-validator');
const auth = require('../middlewares/authMiddleware');
const { createOrder } = require('../controllers/orderController');

const router = express.Router();

router.post(
  '/',
  auth,
  [
    body('fullName').notEmpty(),
    body('address').notEmpty(),
    body('city').notEmpty(),
    body('zip').notEmpty(),
    body('phone').notEmpty(),
    body('total').isFloat({ gt: 0 }),
    body('items').isArray({ min: 1 }),
    body('items.*.name').notEmpty(),
    body('items.*.quantity').isInt({ gt: 0 }),
    body('items.*.unitPrice').isFloat({ gt: 0 })
  ],
  createOrder
);

module.exports = router;
