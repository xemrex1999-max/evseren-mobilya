const dbConnect = require('../../utils/db');
const Product = require('../../models/Product');
const adminAuth = require('../../utils/adminAuth');

const handler = async (req, res) => {
  await dbConnect();
  
  if (req.method === 'GET') {
    const products = await Product.find({}).sort({ createdAt: -1 });
    return res.status(200).json(products);
  }
  
  if (req.method === 'POST') {
    try {
      const product = await Product.create(req.body);
      return res.status(201).json(product);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, ...updateData } = req.body;
      const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
      return res.status(200).json(product);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      await Product.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Silindi' });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
};

module.exports = adminAuth(handler);
