const dbConnect = require('../../utils/db');
const User = require('../../models/User');
const adminAuth = require('../../utils/adminAuth');

const handler = async (req, res) => {
  await dbConnect();

  if (req.method === 'GET') {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    return res.status(200).json(users);
  }

  res.status(405).json({ message: 'Method not allowed' });
};

module.exports = adminAuth(handler);
