const dbConnect = require('../utils/db');
const User = require('../models/User');
const auth = require('../utils/auth');

module.exports = async (req, res) => {
  // Apply Auth Middleware
  auth(req, res, async () => {
    try {
      await dbConnect();

    // GET Request - Fetch profile info
    if (req.method === 'GET') {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
      return res.status(200).json(user);
    }

    // PUT Request - Update profile (optional feature)
    if (req.method === 'PUT') {
      const { name, phone, address, city, zipCode } = req.body;
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });

      if (name) user.name = name;
      
      // Store additional details inside an 'addressInfo' object or mixed type
      // Mongoose schema might not have these yet, let's use markModified if it's dynamic
      if (!user.profile) user.profile = {};
      if (phone) user.profile.phone = phone;
      if (address) user.profile.address = address;
      if (city) user.profile.city = city;
      if (zipCode) user.profile.zipCode = zipCode;
      
      user.markModified('profile');
      await user.save();

      return res.status(200).json({ message: 'Profil güncellendi', user });
    }

    res.setHeader('Allow', ['GET', 'PUT']);
    return res.status(405).json({ message: `Method ${req.method} API endpoint'i desteklenmiyor.` });

  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
  }); // End auth middleware
};
