const dbConnect = require('../../utils/db');
const Order = require('../../models/Order');
const adminAuth = require('../../utils/adminAuth');

const handler = async (req, res) => {
  await dbConnect();
  
  if (req.method === 'GET') {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    return res.status(200).json(orders);
  }

  if (req.method === 'PUT') {
    try {
      const { id, status } = req.body;
      const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
      return res.status(200).json(order);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
};

module.exports = adminAuth(handler);
