const dbConnect = require('../../utils/db');
const Order = require('../../models/Order');
const Product = require('../../models/Product');
const User = require('../../models/User');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  try {
    await dbConnect();
    
    // Total Revenue (Only paid/shipped/delivered)
    const paidOrders = await Order.find({ status: { $in: ['paid', 'shipped', 'delivered'] } });
    const totalRevenue = paidOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    // Counts
    const totalOrders = await Order.countDocuments({});
    const totalProducts = await Product.countDocuments({});
    const totalUsers = await User.countDocuments({});
    
    // Recent Data
    const recentOrders = await Order.find({}).sort({ createdAt: -1 }).limit(5).populate('user', 'name email');
    const recentProducts = await Product.find({}).sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      revenue: totalRevenue,
      counts: {
        orders: totalOrders,
        products: totalProducts,
        users: totalUsers
      },
      recent: {
        orders: recentOrders,
        products: recentProducts
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};
