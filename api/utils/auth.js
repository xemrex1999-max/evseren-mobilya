const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Yetkilendirme reddedildi. Oturum açmalısınız.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
    
    // Check if the user still exists in DB
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Kullanıcı bulunamadı veya silinmiş.' });
    }

    req.user = decoded; // Contains id and role
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
       return res.status(401).json({ message: 'Oturum süreniz doldu, lütfen tekrar giriş yapın.' });
    }
    return res.status(401).json({ message: 'Geçersiz token.' });
  }
};

module.exports = auth;
