const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

// 1. Load Environment Variables
dotenv.config({ path: path.join(__dirname, '.env') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in .env');
  process.exit(1);
}

// 2. Define Product Model (simplified for the script)
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  oldPrice: Number,
}, { strict: false });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// 3. Connect and Update
async function updatePrices() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected!');

    const products = await Product.find({});
    console.log(`Found ${products.length} products. Updating...`);

    let updatedCount = 0;
    for (let product of products) {
      const oldVal = product.price;
      const oldRefVal = product.oldPrice || oldVal;

      // Increase by 10%
      const newVal = Math.round(oldVal * 1.1);
      const newRefVal = Math.round(oldRefVal * 1.1);

      product.price = newVal;
      product.oldPrice = newRefVal;

      await product.save();
      console.log(`Updated "${product.name}": ₺${oldVal} -> ₺${newVal}`);
      updatedCount++;
    }

    console.log(`Success! ${updatedCount} products updated by 10%.`);
  } catch (error) {
    console.error('Database update failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  }
}

updatePrices();
