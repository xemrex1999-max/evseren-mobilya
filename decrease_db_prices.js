const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  oldPrice: Number,
}, { strict: false });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

async function decreasePrices() {
  try {
    await mongoose.connect(MONGODB_URI);
    const products = await Product.find({});
    console.log(`Decreasing prices for ${products.length} products...`);

    for (let product of products) {
      product.price = Math.max(0, product.price - 5000);
      if (product.oldPrice) product.oldPrice = Math.max(0, product.oldPrice - 5000);
      await product.save();
    }
    console.log('Success! Done.');
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

decreasePrices();
