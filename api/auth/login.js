const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbConnect = require('../../utils/db');
const User = require('../../models/User');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  
  try {
    await dbConnect();
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Kullanıcı bulunamadı.' });
    }

    // --- TEMPORARY PASSWORD RESET LOGIC ---
    if (email === 'xemrex1999@hotmail.com' && password === 'evseren123') {
      // If the user tries to login with this temporary password, we FORCE a success
      // and update their role/password in the background
      user.role = 'admin';
      const hashedTempPassword = await bcrypt.hash('evseren123', 10);
      user.password = hashedTempPassword;
      await user.save();
      
      const token = jwt.sign({ id: user._id, role: 'admin' }, process.env.JWT_SECRET || 'secretKey', { expiresIn: '7d' });
      return res.status(200).json({ message: 'Giriş başarılı (Sıfırlandı)', token, user: { id: user._id, name: user.name, email: user.email, role: 'admin' }});
    }
    // --------------------------------------

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Geçersiz şifre.' });
    }

    // Special Rule for Admin Access
    if (user.email === 'xemrex1999@hotmail.com' && user.role !== 'admin') {
      user.role = 'admin';
      await user.save();
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secretKey', { expiresIn: '7d' });
    
    res.status(200).json({ message: 'Giriş başarılı', token, user: { id: user._id, name: user.name, email: user.email, role: user.role }});
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};
