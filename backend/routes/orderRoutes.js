const express = require('express');
const { createOrder, getMyOrders, trackOrder, updateOrderStatus, getAllOrders } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, admin, getAllOrders);
router.get('/:userId', protect, getMyOrders);
router.get('/track/:orderCode', trackOrder);
router.put('/:id', protect, admin, updateOrderStatus);

module.exports = router;
