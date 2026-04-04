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

async function checkPrices() {
  try {
    await mongoose.connect(MONGODB_URI);
    const products = await Product.find({}).limit(5);
    console.log('--- Database Verification ---');
    products.forEach(p => {
      console.log(`${p.name}: Current Price: ₺${p.price}, Old Price: ₺${p.oldPrice}`);
    });
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

checkPrices();
