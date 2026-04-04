const dbConnect = require('../utils/db');
const Order = require('../models/Order');
const auth = require('../utils/auth');

module.exports = async (req, res) => {
  // Apply Auth Middleware
  auth(req, res, async () => {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
      await dbConnect();

      // Fetch orders that belong to the logged-in user, sorted by newest
      const orders = await Order.find({ user: req.user.id })
                                .sort({ createdAt: -1 });

      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Sunucu hatası', error: error.message });
    }
  }); // End auth middleware
};
