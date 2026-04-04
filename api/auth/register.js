const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbConnect = require('../../utils/db');
const User = require('../../models/User');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  
  try {
    await dbConnect();
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Kullanıcı zaten mevcut.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = (email === 'xemrex1999@hotmail.com') ? 'admin' : 'user';
    const user = await User.create({ name, email, password: hashedPassword, role: userRole });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secretKey', { expiresIn: '7d' });
    
    res.status(201).json({ message: 'Kayıt başarılı', token, user: { id: user._id, name: user.name, email: user.email, role: user.role }});
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};
