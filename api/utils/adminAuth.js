const jwt = require('jsonwebtoken');

module.exports = (handler) => async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Yetkisiz erişim' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
    
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Bu işlem için admin yetkisi gerekiyor' });
    }
    
    req.user = decoded;
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ message: 'Geçersiz token' });
  }
};
