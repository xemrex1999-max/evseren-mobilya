const Order = require('../models/Order');
const { sendOrderEmail } = require('../utils/sendEmail');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
    const { products, totalPrice, customerInfo } = req.body;
    try {
        if (!products || products.length === 0) return res.status(400).json({ message: 'Sepetiniz boş.' });

        // Step 6: Generate ORDER-XXXXXX
        const orderCode = 'ORDER-' + Math.random().toString(36).substring(2, 8).toUpperCase();

        const order = await Order.create({
            userId: req.user._id,
            orderCode,
            products,
            totalPrice,
            status: "Onaylandı" // Step 7: Default status
        });

        // OTOMATİK E-POSTA BİLDİRİMİ (Yöneticiye)
        // customerInfo gelmişse onu kullanıyoruz, yoksa session'daki user verisini kullanıyoruz
        const emailUser = {
            name: customerInfo?.name || req.user.name,
            email: req.user.email,
            phone: customerInfo?.phone || req.user.phone,
            address: customerInfo?.address || req.user.address
        };
        
        // E-posta gönderimini arka planda başlatıyoruz (await etmiyoruz ki sipariş hızı düşmesin)
        sendOrderEmail(order, emailUser).catch(err => console.error("E-posta gönderim hatası:", err));

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user orders
// @route   GET /api/orders/:userId
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Track order by code
// @route   GET /api/orders/track/:orderCode
// @access  Public
const trackOrder = async (req, res) => {
    try {
        const order = await Order.findOne({ orderCode: req.params.orderCode.toUpperCase() });
        if (order) res.json(order);
        else res.status(404).json({ message: 'Sipariş kodu geçersiz.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (order) res.json(order);
        else res.status(404).json({ message: 'Sipariş bulunamadı.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all orders (Admin Only)
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrder, getMyOrders, trackOrder, updateOrderStatus, getAllOrders };
